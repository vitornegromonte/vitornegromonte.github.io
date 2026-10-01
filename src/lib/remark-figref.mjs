// Figure labels, auto-numbering and cross-references — no dependencies.
// Two plugins (order matters in astro.config.mjs):
//   1. remarkFigLabels  — runs FIRST: harvests trailing `{#fig-id}` (plus an
//      optional `.fullwidth`) from image-only paragraphs and stashes them on
//      the image node before remarkFigure consumes it.
//   2. remarkFigRefs    — runs LAST: numbers every <figure> (except
//      .marginfigure) in document order, prefixes figcaptions with
//      "Figure N", ensures an id anchor, and rewrites `@fig-id` in prose
//      into "Figure N" links. Unresolved refs are left literal + warned.
import { visit } from 'unist-util-visit';

const LABEL_RE = /^\s*\{#([\w-]+)(\s+\.fullwidth)?\}\s*$/;
// Refs are `@fig-some-id` (must equal a figure id); the `fig-` prefix
// keeps emails and @mentions from ever matching.
const REF_RE = /@(fig-[\w-]+)/g;

export function remarkFigLabels() {
  return (tree) => {
    visit(tree, 'paragraph', (node) => {
      if (node.children.length !== 2) return;
      const [img, tail] = node.children;
      if (img.type !== 'image' || tail.type !== 'text') return;
      const m = tail.value.match(LABEL_RE);
      if (!m) return;
      img.data = img.data || {};
      img.data.figId = m[1];
      if (m[2]) img.data.figFullwidth = true;
      node.children = [img];
    });
  };
}

function figureOpenTag(html) {
  return html.match(/<figure\b[^>]*>/)?.[0] ?? null;
}

function hasClass(tag, cls) {
  const m = tag.match(/\bclass="([^"]*)"/);
  return !!m && m[1].split(/\s+/).includes(cls);
}

export function remarkFigRefs() {
  return (tree, file) => {
    const idToNum = new Map();
    const warnings = [];
    let n = 0;

    // Pass 1: number figures in document order.
    visit(tree, 'html', (node) => {
      const tag = figureOpenTag(node.value);
      if (!tag || !node.value.includes('</figure>')) return;
      if (hasClass(tag, 'marginfigure')) return;
      n += 1;
      let id = tag.match(/\bid="([^"]*)"/)?.[1];
      if (!id) {
        id = `fig-auto-${n}`;
        node.value = node.value.replace('<figure', `<figure id="${id}"`);
      }
      idToNum.set(id, n);
      // Prefix "Figure N" to the figcaption, if any.
      node.value = node.value.replace(
        /<figcaption>([\s\S]*?)<\/figcaption>/,
        (_m, cap) =>
          cap.includes('fig-no')
            ? _m
            : `<figcaption><span class="fig-no">Figure ${n}</span> ${cap}</figcaption>`,
      );
    });

    // Pass 2: rewrite @id refs in prose (never inside code).
    visit(tree, 'text', (node, index, parent) => {
      if (!parent || index == null) return;
      if (parent.type === 'code' || parent.type === 'inlineCode') return;
      REF_RE.lastIndex = 0;
      if (!REF_RE.test(node.value)) return;
      REF_RE.lastIndex = 0;
      const parts = [];
      let last = 0;
      let m;
      let changed = false;
      while ((m = REF_RE.exec(node.value)) !== null) {
        const num = idToNum.get(m[1]);
        if (!num) {
          warnings.push(`unresolved @${m[1]}`);
          continue;
        }
        changed = true;
        if (m.index > last) parts.push({ type: 'text', value: node.value.slice(last, m.index) });
        parts.push({ type: 'html', value: `<a href="#${m[1]}" class="fig-ref">Figure ${num}</a>` });
        last = m.index + m[0].length;
      }
      if (!changed) return;
      if (last < node.value.length) parts.push({ type: 'text', value: node.value.slice(last) });
      parent.children.splice(index, 1, ...parts);
    });

    if (warnings.length > 0) {
      const name = file?.path || file?.history?.[0] || 'note';
      console.warn(`[figref] ${name}: ${[...new Set(warnings)].join(', ')}`);
    }
  };
}
