// One-off migration: committed TikZ <figure> HTML blobs -> one-liner
// markdown (`![caption](src){#fig-id}`), bare images inside marginfigure
// fences, and unnumbered sidenote fences. Idempotent-ish: skips files with
// no remaining HTML figure blobs. Run once: bun scripts/migrate-figures.mjs
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

const normId = (id) => id.replace(/:/g, '-');

for (const file of NOTES) {
  const p = join(ROOT, 'src/content/notes', file);
  let text = await readFile(p, 'utf8');
  let figs = 0;
  let margins = 0;
  let notes = 0;

  // 1. <figure class="tikz-figure[ fullwidth]"[ id]><img src alt …><figcaption>cap</figcaption></figure>
  //    -> ![cap](src){#id}  (math in captions now renders via remarkFigure)
  text = text.replace(
    /<figure class="tikz-figure( fullwidth)?"( id="([^"]*)")?><img src="([^"]+)" alt="[^"]*"[^>]*\/><figcaption>([\s\S]*?)<\/figcaption><\/figure>/g,
    (_m, fullwidth, _attrs, id, src, cap) => {
      figs++;
      void _attrs;
      // No hand id? Reuse the compiled filename hash (fig-<hash>.svg) so the
      // label is stable and unique without inventing names.
      const fromSrc = src.match(/\/figures\/(fig-[\w-]+)\.svg$/)?.[1];
      const labelId = id ? normId(id) : fromSrc;
      const label = labelId ? `{#${labelId}${fullwidth ? ' .fullwidth' : ''}}` : '';
      return `![${cap.trim()}](${src})${label}`;
    },
  );

  // 2. marginfigure fences holding pasted <figure> HTML -> bare image line.
  text = text.replace(
    /```marginfigure\n<figure class="tikz-figure"><img src="([^"]+)" alt="([^"]*)"[^>]*\/><\/figure>\n```/g,
    (_m, src, alt) => {
      margins++;
      return `\`\`\`marginfigure\n![${alt}](${src})\n\`\`\``;
    },
  );

  // 3. Sidenotes: drop hand-maintained numbers (auto-numbered at build now).
  text = text.replace(/<span class="note-no">.*?<\/span>\s*/g, () => {
    notes++;
    return '';
  });

  // 1b. Caption-less placeholders (<figure><img alt="Figure N"></figure>):
  //     -> bare ![](src){#id} (plain img, no figure wrapper — note:check
  //     flags these for a real caption; avoids "Figure 5 Figure 0" output).
  text = text.replace(
    /<figure class="tikz-figure"><img src="([^"]+)" alt="Figure \d+"[^>]*\/><\/figure>/g,
    (_m, src) => {
      figs++;
      const fromSrc = src.match(/\/figures\/(fig-[\w-]+)\.svg$/)?.[1];
      return `![](${src})${fromSrc ? `{#${fromSrc}}` : ''}`;
    },
  );

  // 4. Escape `$` as `\$` inside ![alt](...) lines: otherwise remark-math
  //    eats the delimiters during parsing and captions lose their math
  //    before remarkFigure can render it (alt keeps literal `$...$`).
  text = text.split('\n').map((line) => {
    if (!line.startsWith('![')) return line;
    const end = line.indexOf('](');
    if (end === -1) return line;
    const alt = line.slice(2, end).replace(/(?<!\\)\$/g, '\\$');
    return `![${alt}]${line.slice(end + 1)}`;
  }).join('\n');

  await writeFile(p, text, 'utf8');
  console.log(`${file}: ${figs} figures, ${margins} marginfigures, ${notes} note-no spans`);
}
