// rehype plugin: intrinsic sizing for note-figure images.
// Backstop for anything the remark stage leaves bare (empty-alt
// placeholders, images sharing a paragraph, marginfigures): any <img>
// whose src resolves under /notes/<slug>/figures/ gets width/height +
// aspect-ratio. dimsForSrc's path check is the scoping — safe to run on
// every image element. No CLS, no extra requests.
import { visit } from 'unist-util-visit';
import { dimsForSrc } from './fig-dims.mjs';

export function rehypeTikzDims() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'img') return;
      if (node.properties?.width && node.properties?.height) return;
      const dims = dimsForSrc(node.properties?.src);
      if (!dims) return;
      node.properties.width = String(dims.w);
      node.properties.height = String(dims.h);
      node.properties.style = `aspect-ratio:${dims.w} / ${dims.h}`;
    });
  };
}
