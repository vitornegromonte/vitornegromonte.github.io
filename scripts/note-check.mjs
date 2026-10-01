// Authoring guardrails: bun run note:check
// Fails on: bad frontmatter, figure src files missing on disk, leftover raw
// HTML figure blobs, empty alt placeholders, unresolved @fig- refs.
import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, basename } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const NOTES_DIR = join(ROOT, 'src/content/notes');
let fails = 0;
let warns = 0;
const fail = (f, msg) => {
  fails++;
  console.log(`FAIL ${f}: ${msg}`);
};
// Warnings (author TODOs) never fail CI; hard errors do.
const warn = (f, msg) => {
  warns++;
  console.log(`WARN ${f}: ${msg}`);
};

for (const f of (await readdir(NOTES_DIR)).filter((x) => x.endsWith('.md'))) {
  const p = join(NOTES_DIR, f);
  const slug = basename(f, '.md');
  const text = await readFile(p, 'utf8');
  const fm = text.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) fail(f, 'missing frontmatter');
  else {
    for (const key of ['title:', 'topic:', 'lang:']) {
      if (!fm[1].includes(key)) fail(f, `frontmatter missing ${key}`);
    }
  }
  if (/tikz-light|tikz-dark|-dark\.svg|<span class="note-no">/.test(text)) {
    fail(f, 'leftover legacy figure/sidenote markup — rerun migrate-figures.mjs');
  }
  // Figure srcs must exist (markdown images + marginfigure lines).
  for (const m of text.matchAll(/!\[[^\]]*\]\((\/notes\/[^)\s]+)\)/g)) {
    const local = join(ROOT, 'public', m[1]);
    if (!existsSync(local)) fail(f, `missing file ${m[1]}`);
  }
  if (/!\[\]\(/.test(text)) warn(f, 'empty-alt placeholder image — add a caption');
  // Figure one-liners need blank lines around them, else markdown merges
  // them into the adjacent paragraph (lazy continuation) and no <figure>
  // wrapper/caption is produced.
  const lines = text.split('\n');
  lines.forEach((line, i) => {
    if (/^!\[.*\]\(.*\)(\{#.*\})?$/.test(line)) {
      if (i > 0 && lines[i - 1].trim() !== '' && !lines[i - 1].startsWith('```')) {
        fail(f, `line ${i + 1}: figure needs a blank line above`);
      }
      if (i < lines.length - 1 && lines[i + 1].trim() !== '' && !lines[i + 1].startsWith('```')) {
        fail(f, `line ${i + 1}: figure needs a blank line below`);
      }
    }
  });
  // @fig- refs must resolve to a {#id} label in the same file.
  const labels = new Set([...text.matchAll(/\{#(fig-[\w-]+)/g)].map((m) => m[1]));
  for (const m of text.matchAll(/@(fig-[\w-]+)/g)) {
    if (!labels.has(m[1])) fail(f, `unresolved @${m[1]}`);
  }
  void slug;
}

console.log(fails === 0 ? `note:check OK (${warns} warning(s))` : `${fails} problem(s), ${warns} warning(s)`);
process.exit(fails === 0 ? 0 : 1);
