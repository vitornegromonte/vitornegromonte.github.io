// remark plugin for single light-only TikZ figures (SEO-test template).
// Converts ```tikz fences into <figure class="tikz-figure"> with ONE <img>
// (light only — no dark twin, no theme JS). Emits intrinsic width/height +
// aspect-ratio from the .json sidecar written by scripts/build-tikz-single.mjs
// so figures reserve space before paint (no CLS).
import { visit } from 'unist-util-visit';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { join, basename, dirname } from 'node:path';
import katex from 'katex';

const ROOT = join(import.meta.dirname, '..', '..');

function stripCaptions(latex) {
  let out = '';
  let i = 0;
  while (i < latex.length) {
    if (latex.startsWith('\\caption{', i)) {
      let depth = 0;
      let j = i;
      for (; j < latex.length; j++) {
        if (latex[j] === '{') depth++;
        else if (latex[j] === '}') { depth--; if (depth === 0) break; }
      }
      i = j + 1;
      continue;
    }
    if (latex.startsWith('\\label{', i)) {
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

function extractForHash(source) {
  const fig = source.match(/\\begin\{figure\}[\s\S]*?\\end\{figure\}/);
  if (fig) return stripCaptions(fig[0]);
  const pics = [...source.matchAll(/\\begin\{tikzpicture\}[\s\S]*?\\end\{tikzpicture\}/g)].map((x) => x[0]);
  const joined = pics.length ? pics.join('\n') : source;
  return stripCaptions(joined);
}

function hashOf(tikzSource) {
  return createHash('sha1').update(extractForHash(tikzSource)).digest('hex').slice(0, 10);
}

function extractCaption(source) {
  let lastIdx = -1;
  let pos = 0;
  while (true) {
    const idx = source.indexOf('\\caption{', pos);
    if (idx === -1) break;
    lastIdx = idx;
    pos = idx + 9;
  }
  if (lastIdx === -1) return null;
  let depth = 0;
  let start = -1;
  for (let i = lastIdx; i < source.length; i++) {
    if (source[i] === '{') {
      if (depth === 0) start = i + 1;
      depth++;
    } else if (source[i] === '}') {
      depth--;
      if (depth === 0 && start !== -1) {
        return source.slice(start, i).trim();
      }
    }
  }
  return null;
}

function escapeCaption(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderCaption(caption) {
  if (!caption) return '';
  const parts = caption.split(/(\$[^$]+?\$)/g);
  return parts
    .map((part) => {
      if (part.startsWith('$') && part.endsWith('$') && part.length > 1) {
        const tex = part.slice(1, -1);
        try {
          return katex.renderToString(tex, { throwOnError: false, displayMode: false, strict: false });
        } catch {
          return escapeCaption(part);
        }
      }
      return escapeCaption(part);
    })
    .join('');
}

function slugFromFile(file) {
  const p = file?.path || file?.history?.[0] || '';
  if (!p) return 'untitled';
  const asPath = String(p).replace(/^file:\/\//, '');
  const m = asPath.match(/\/notes\/([^/]+)\.md(?:$|\?)/);
  if (m) return m[1];
  const base = basename(asPath).replace(/\.md$/, '').replace(/\?.*$/, '');
  if (base && base !== 'index') return base;
  const dir = basename(dirname(asPath));
  return dir || 'untitled';
}

// Intrinsic dims from the prebuild sidecar (public/notes/<slug>/figures/fig-<hash>.json).
function dimsFor(slug, name) {
  try {
    const p = join(ROOT, 'public', 'notes', slug, 'figures', `${name}.json`);
    if (!existsSync(p)) return null;
    const d = JSON.parse(readFileSync(p, 'utf8'));
    if (Number.isFinite(d.w) && Number.isFinite(d.h) && d.w > 0 && d.h > 0) return d;
    return null;
  } catch {
    return null;
  }
}

export function remarkTikzSingle() {
  return (tree, file) => {
    const slug = slugFromFile(file);
    visit(tree, 'code', (node, index, parent) => {
      if (!parent || index == null) return;
      if (String(node.lang || '').trim().toLowerCase() !== 'tikz') return;
      const source = node.value || '';
      const hasTikz = /\\begin\{tikzpicture\}/.test(source);
      if (!hasTikz) return;
      const hashSrc = extractForHash(source);
      const caption = extractCaption(source);
      const hash = hashOf(hashSrc);
      const name = `fig-${hash}`;
      const url = `/notes/${slug}/figures/${name}.svg`;
      const captionHtml = caption ? `<figcaption>${renderCaption(caption)}</figcaption>` : '';
      const alt = caption ? escapeCaption(caption).replace(/"/g, '&quot;') : '';
      const dims = dimsFor(slug, name);
      const sizeAttrs = dims ? ` width="${dims.w}" height="${dims.h}" style="aspect-ratio:${dims.w} / ${dims.h}"` : '';
      // Optional `{#fig-id}` (and `.fullwidth`) in the fence info string,
      // e.g. ```tikz {#fig-comp-graph}: feeds auto-numbering + @fig- refs.
      const metaLabel = String(node.meta || '').match(/\{#([\w-]+)(\s+\.fullwidth)?\}/);
      const figId = metaLabel ? ` id="${metaLabel[1]}"` : '';
      const figClass = metaLabel?.[2] ? ' class="tikz-figure fullwidth"' : ' class="tikz-figure"';
      const html = `<figure${figId}${figClass}><img src="${url}" alt="${alt}"${sizeAttrs} loading="lazy" decoding="async" />${captionHtml}</figure>`;
      parent.children[index] = { type: 'html', value: html };
    });
  };
}
