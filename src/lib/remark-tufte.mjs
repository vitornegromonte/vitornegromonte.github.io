// remark plugin para blocos de notas.
//
// Authoring syntax (fenced code blocks, convertidos no build):
//
//   ```sidenote
//   <span class="note-no">1</span> Texto da nota lateral.
//   ```
//
//   ```marginfigure
//   ![Legenda](/notes/<slug>/figures/fig.svg)
//   ```
//
// Cada bloco vira <div class="sidenote"> ou <figure class="marginfigure">
// no fluxo do documento. Antes eram floats na margem (Tufte); agora são
// blocos no fluxo (callout / figura centralizada) — ver src/styles/notes.css.
//
// Caveat: maths dentro de um bloco não são processados por remark-math
// (o conteúdo vive num node code). Nenhuma nota atual precisa disso.
import { visit } from 'unist-util-visit';

const SIDENOTE = /^sidenote$/i;
const MARGINFIGURE = /^marginfigure$/i;

const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

export function remarkTufte() {
  return (tree) => {
    // Sidenotes are auto-numbered in document order — authors write plain
    // text, no hand-maintained <span class="note-no">N</span> (legacy spans
    // are stripped and renumbered).
    let noteNo = 0;
    visit(tree, 'code', (node, index, parent) => {
      if (!parent || index == null) return;
      const lang = String(node.lang ?? '').trim();
      let html = null;
      if (SIDENOTE.test(lang)) {
        noteNo += 1;
        const text = node.value
          .trim()
          .replace(/<span class="note-no">.*?<\/span>\s*/g, '');
        html = `<div class="sidenote"><span class="note-no">${noteNo}</span> ${text}</div>`;
      } else if (MARGINFIGURE.test(lang)) {
        const raw = node.value.trim();
        // Bare markdown image (preferred): ![caption](/path/fig.svg)
        const m = raw.match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/);
        if (m) {
          const alt = escapeHtml(m[1].trim());
          const figcap = alt ? `<figcaption>${alt}</figcaption>` : '';
          html = `<figure class="marginfigure"><img src="${m[2]}" alt="${alt}" loading="lazy" decoding="async" />${figcap}</figure>`;
        } else {
          const inner = raw.match(/!\[([^\]]*)\]\(([^)\s]+)\)/);
          if (inner) {
            const alt = escapeHtml(inner[1].trim());
            const figcap = alt ? `<figcaption>${alt}</figcaption>` : '';
            html = `<figure class="marginfigure"><img src="${inner[2]}" alt="${alt}" loading="lazy" decoding="async" />${figcap}</figure>`;
          } else {
            html = `<figure class="marginfigure">${raw}</figure>`;
          }
        }
      }
      if (html) parent.children[index] = { type: 'html', value: html };
    });
  };
}