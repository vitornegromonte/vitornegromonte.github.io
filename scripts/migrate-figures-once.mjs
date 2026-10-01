// One-off migration: pre-rendered <figure class="tikz-figure"> blocks in the
// copied notes still reference light+dark twin <img>s. Collapse each figure
// to a single light-only <img> (dark twins were deleted from public/).
// Run once with: bun scripts/migrate-figures-once.mjs
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const NOTES = [
  'autodiff.md',
  'generalization.md',
  'generative-images.md',
  'intro-neural-networks.md',
  'world-models.md',
];

for (const file of NOTES) {
  const p = join(ROOT, 'src/content/notes', file);
  let text = await readFile(p, 'utf8');
  let count = 0;
  text = text.replace(
    /<figure class="tikz-figure( fullwidth)?"([^>]*)><img src="([^"]+)" alt="([^"]*)" class="tikz-light" loading="lazy" \/><img src="[^"]+-dark\.svg" alt="[^"]*" class="tikz-dark" loading="lazy" \/>/g,
    (_m, fullwidth, attrs, src, alt) => {
      count++;
      return `<figure class="tikz-figure${fullwidth ?? ''}"${attrs}><img src="${src}" alt="${alt}" loading="lazy" decoding="async" />`;
    },
  );
  await writeFile(p, text, 'utf8');
  console.log(`${file}: ${count} figures collapsed`);
}
