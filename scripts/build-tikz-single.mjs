// Builds SINGLE light-only TikZ SVGs for ```tikz blocks in
// src/content/notes/**/*.md and src/content/work/**/*.md.
// Runs in prebuild: compiles via pdflatex -> dvisvgm (light preamble only),
// optimizes with SVGO, and writes a fig-{hash}.json sidecar with intrinsic
// pixel dims so the remark plugin can emit width/height (no CLS).
// Prebuilt SVGs copied from the main site are picked up: they get SVGO +
// sidecars without recompiling.

import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { optimize } from 'svgo';

const ROOT = join(import.meta.dirname, '..');
const NOTES_DIR = join(ROOT, 'src/content/notes');
const WORK_DIR = join(ROOT, 'src/content/work');
const TIKZ_WORK = join(ROOT, '.tikz-work');

const TIKZ_FENCE_RE = /```tikz[^\n]*\n([\s\S]*?)\n```/g;

// Light (Horizon-bright) preamble — the only variant in this template.
const PREAMBLE = String.raw`\documentclass[border=2pt,varwidth]{standalone}
\usepackage{pgfplots}
\usepackage[dvipsnames]{xcolor}
\usepackage{amssymb, amsmath}
\pgfplotsset{compat = newest}
\usepackage{tikz}
\usetikzlibrary{shadings}
\usetikzlibrary{calc,arrows.meta}
\usetikzlibrary{shapes.misc}
\usetikzlibrary{shapes.geometric}
\usetikzlibrary{matrix}
\usetikzlibrary{positioning}
\usetikzlibrary{decorations.pathmorphing}
\usepackage[most]{tcolorbox}
\usepgfplotslibrary{colormaps,patchplots}
\usepackage{adjustbox}
\usepackage{subcaption}
\captionsetup[subfigure]{font=footnotesize, labelfont=bf}

\definecolor{wp-bg}{HTML}{FDF0ED}
\definecolor{wp-text}{HTML}{06060C}
\definecolor{wp-primary}{HTML}{DA103F}
\definecolor{wp-accent}{HTML}{F6661E}
\definecolor{wp-light}{HTML}{F9CBBE}
\definecolor{wp-muted}{HTML}{8A8A8A}
\definecolor{wp-dark}{HTML}{1C1E26}
\definecolor{wp-code}{HTML}{FDF0ED}
\pagecolor{wp-bg}
\color{wp-text}
`;

function run(cmd, args, cwd) {
  return new Promise((resolve) => {
    const proc = spawn(cmd, args, { cwd });
    let out = '';
    let err = '';
    proc.stdout.on('data', (d) => (out += d));
    proc.stderr.on('data', (d) => (err += d));
    proc.on('close', (code) => resolve({ code, out, err }));
    proc.on('error', (e) => resolve({ code: -1, out, err: e.message }));
  });
}

function stripCaptions(latex) {
  let out = '';
  let i = 0;
  while (i < latex.length) {
    if (latex.startsWith('\\caption{', i) || latex.startsWith('\\label{', i)) {
      let depth = 0;
      let j = i;
      for (; j < latex.length; j++) {
        if (latex[j] === '{') depth++;
        else if (latex[j] === '}') { depth--; if (depth === 0) break; }
      }
      i = j + 1;
      continue;
    }
    out += latex[i];
    i++;
  }
  return out;
}

function extractTikzForCompile(source) {
  const figMatch = source.match(/\\begin\{figure\}[\s\S]*?\\end\{figure\}/);
  if (figMatch) return stripCaptions(figMatch[0]);
  const pics = [...source.matchAll(/\\begin\{tikzpicture\}[\s\S]*?\\end\{tikzpicture\}/g)].map((m) => m[0]);
  if (pics.length === 0) return null;
  if (pics.length === 1) return stripCaptions(pics[0]);
  return stripCaptions(pics.join('\n\\par\\vspace{0.5cm}\n'));
}

function hashOf(tikzSource) {
  return createHash('sha1').update(tikzSource).digest('hex').slice(0, 10);
}

async function extractLatexError(logPath) {
  if (!existsSync(logPath)) return '(no log file produced)';
  const log = await readFile(logPath, 'utf8');
  const lines = log.split('\n');
  const errIdx = lines.findIndex((l) => l.startsWith('! '));
  if (errIdx === -1) return log.trim().split('\n').slice(-15).join('\n');
  return lines.slice(errIdx, errIdx + 6).join('\n').trim();
}

// Parse intrinsic dims from the SVG root (width/height in pt or px, else viewBox).
function parseDims(svgText) {
  const tag = svgText.match(/<svg[^>]*>/)?.[0] ?? '';
  const num = (v) => {
    if (!v) return null;
    const m = String(v).match(/^([\d.]+)(pt|px)?$/);
    if (!m) return null;
    const px = parseFloat(m[1]) * (m[2] === 'pt' ? 96 / 72 : 1);
    return Math.round(px);
  };
  const w = num(tag.match(/\swidth='([^']+)'/)?.[1] ?? tag.match(/\swidth="([^"]+)"/)?.[1]);
  const h = num(tag.match(/\sheight='([^']+)'/)?.[1] ?? tag.match(/\sheight="([^"]+)"/)?.[1]);
  if (w && h) return { w, h };
  const vb = tag.match(/viewBox=['"]([\d.\s-]+)['"]/)?.[1]?.trim().split(/\s+/).map(Number);
  if (vb?.length === 4 && vb[2] > 0 && vb[3] > 0) return { w: Math.round(vb[2]), h: Math.round(vb[3]) };
  return null;
}

async function optimizeAndSidecar(svgPath, baseName) {
  const raw = await readFile(svgPath, 'utf8');
  const before = Buffer.byteLength(raw);
  const dims = parseDims(raw);
  const result = optimize(raw, {
    path: svgPath,
    multipass: true,
    plugins: [
      'removeDoctype', 'removeXMLProcInst', 'removeComments', 'removeMetadata',
      'removeEditorsNSData', 'cleanupAttrs', 'mergeStyles', 'inlineStyles',
      { name: 'cleanupIds', params: { preservePrefixes: ['cp'] } },
      'removeHiddenElems', 'removeEmptyContainers', 'collapseGroups',
      'removeUselessStrokeAndFill', 'removeUnusedNS',
    ],
  });
  if (result.error) {
    console.error(`[tikz] svgo failed for ${baseName}: ${result.error}`);
  } else {
    await writeFile(svgPath, result.data, 'utf8');
    const after = Buffer.byteLength(result.data);
    console.log(`[tikz] ${baseName}.svg svgo ${before} -> ${after} bytes`);
  }
  if (dims) {
    await writeFile(join(svgPath.replace(/\.svg$/, '.json')), JSON.stringify(dims), 'utf8');
  } else {
    console.error(`[tikz] ${baseName}: could not parse SVG dims`);
  }
  return dims;
}

async function compileOne(tikz, workDir, outDir, baseName) {
  const name = baseName;
  const texPath = join(workDir, `${name}.tex`);
  const pdfPath = join(workDir, `${name}.pdf`);
  const svgPath = join(outDir, `${name}.svg`);
  const sidecar = join(outDir, `${name}.json`);

  if (existsSync(svgPath)) {
    // Prebuilt (copied) SVG: ensure it is optimized + has a dims sidecar.
    if (!existsSync(sidecar)) {
      const dims = await optimizeAndSidecar(svgPath, baseName);
      return { ok: true, name, svgPath, cached: false, dims };
    }
    return { ok: true, name, svgPath, cached: true };
  }

  // Fresh compile needed (new ```tikz fence): requires a TeX toolchain.
  // CI runners don't have one — compile locally and commit public/ SVGs.
  const hasToolchain = await run('pdflatex', ['--version'], workDir).then(
    (r) => r.code === 0,
    () => false,
  );
  if (!hasToolchain) {
    return {
      ok: false,
      error: `no TeX toolchain (pdflatex) for new figure ${baseName}. Compile locally with pdflatex + dvisvgm (bun run prebuild) and commit public/notes/*/figures/ before pushing.`,
    };
  }
  await writeFile(texPath, `${PREAMBLE}\n\\begin{document}\n${tikz}\n\\end{document}\n`, 'utf8');
  await run('pdflatex', ['-interaction=nonstopmode', '-halt-on-error', `${name}.tex`], workDir);
  if (!existsSync(pdfPath)) {
    return { ok: false, error: `pdflatex failed:\n${await extractLatexError(join(workDir, `${name}.log`))}` };
  }
  const convert = await run(
    'dvisvgm',
    ['--pdf', '--font-format=woff', '--bbox=papersize', `${name}.pdf`, '-o', svgPath],
    workDir,
  );
  if (!existsSync(svgPath)) {
    return { ok: false, error: `dvisvgm failed:\n${convert.err.trim().slice(-1000)}` };
  }
  const dims = await optimizeAndSidecar(svgPath, baseName);
  console.log(`[tikz] ${baseName}.svg built`);
  return { ok: true, name, svgPath, cached: false, dims };
}

function slugFromPath(p) {
  return basename(p).replace(/\.md$/, '');
}

async function collectFiles(dir) {
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  const out = [];
  for (const e of entries) {
    if (e.isDirectory()) out.push(...(await collectFiles(join(dir, e.name))));
    else if (e.isFile() && e.name.endsWith('.md')) out.push(join(dir, e.name));
  }
  return out;
}

async function processFile(filePath) {
  const text = await readFile(filePath, 'utf8');
  const slug = slugFromPath(filePath);
  const outDir = join(ROOT, 'public', 'notes', slug, 'figures');
  let m;
  TIKZ_FENCE_RE.lastIndex = 0;
  const blocks = [];
  while ((m = TIKZ_FENCE_RE.exec(text)) !== null) blocks.push(m[1]);
  if (blocks.length === 0) return { file: filePath, slug, blocks: 0, ok: true };
  await mkdir(outDir, { recursive: true });
  await mkdir(TIKZ_WORK, { recursive: true });
  for (const src of blocks) {
    const tikz = extractTikzForCompile(src);
    if (!tikz) return { file: filePath, slug, blocks: blocks.length, ok: false, error: 'no tikzpicture found' };
    const r = await compileOne(tikz, TIKZ_WORK, outDir, `fig-${hashOf(tikz)}`);
    if (!r.ok) {
      console.error(`[tikz] ${slug}: ${r.error}`);
      return { file: filePath, slug, blocks: blocks.length, ok: false, error: r.error };
    }
    if (r.cached) console.log(`[tikz] ${slug}: ${r.name}.svg cached`);
  }
  return { file: filePath, slug, blocks: blocks.length, ok: true };
}

const files = [...(await collectFiles(NOTES_DIR)), ...(await collectFiles(WORK_DIR))];
if (files.length === 0) {
  console.log('[tikz] no markdown files found');
  process.exit(0);
}
let total = 0;
let failed = 0;
for (const f of files) {
  const r = await processFile(f);
  total += r.blocks;
  if (!r.ok) failed++;
}
console.log(`[tikz] fences done: ${total} blocks, ${failed} failures`);

// Sweep: optimize every committed SVG under public/notes/*/figures/ and
// (re)write its dims sidecar, so the rehype plugin can inject intrinsic
// width/height even for figures whose source fences are long gone.
async function collectSvgs(dir) {
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  const out = [];
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await collectSvgs(p)));
    else if (e.isFile() && e.name.endsWith('.svg')) out.push(p);
  }
  return out;
}

const svgs = await collectSvgs(join(ROOT, 'public', 'notes'));
let swept = 0;
for (const svgPath of svgs) {
  const sidecar = svgPath.replace(/\.svg$/, '.json');
  if (existsSync(sidecar)) {
    swept++;
    continue;
  }
  await optimizeAndSidecar(svgPath, basename(svgPath, '.svg'));
  swept++;
}
console.log(`[tikz] sweep done: ${swept} svgs have sidecars`);
if (failed > 0) process.exit(1);
