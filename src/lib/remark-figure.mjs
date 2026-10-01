// Wraps imagens markdown que estão sozinhas em um parágrafo em <figure> com <figcaption>.
// Usa o alt da imagem como legenda — padroniza legendas em todas as imagens (não só TikZ).
import { visit } from 'unist-util-visit';
import katex from 'katex';
import { dimsForSrc } from './fig-dims.mjs';

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
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
          return escapeHtml(part);
        }
      }
      return escapeHtml(part);
    })
    .join('');
}

export function remarkFigure() {
  return (tree) => {
    visit(tree, 'paragraph', (node, index, parent) => {
      if (!parent || index == null) return;
      // só parágrafos com exatamente 1 filho que é imagem
      if (node.children.length !== 1) return;
      const child = node.children[0];
      if (child.type !== 'image') return;
      const alt = (child.alt || '').trim();
      if (!alt) return; // sem alt, não adiciona legenda
      const url = child.url || '';
      const title = child.title || null;
      const escAlt = escapeHtml(alt);
      const titleAttr = title ? ` title="${title.replace(/"/g, '&quot;')}"` : '';
      const figCaption = renderCaption(alt);
      // Label harvested by remarkFigLabels (runs before this plugin).
      const figId = child.data?.figId ? ` id="${child.data.figId}"` : '';
      const figClass = child.data?.figFullwidth ? ' class="fullwidth"' : '';
      // Intrinsic dims at the source (deterministic — no reliance on how
      // the downstream HTML parser treats KaTeX-rich figcaptions).
      const dims = dimsForSrc(url);
      const sizeAttrs = dims ? ` width="${dims.w}" height="${dims.h}" style="aspect-ratio:${dims.w} / ${dims.h}"` : '';
      const html = `<figure${figId}${figClass}><img src="${url}" alt="${escAlt}"${titleAttr}${sizeAttrs} loading="lazy" decoding="async" /><figcaption>${figCaption}</figcaption></figure>`;
      parent.children[index] = { type: 'html', value: html };
    });
  };
}
