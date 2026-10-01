// Shared intrinsic-dims lookup for note figures (build-time only).
// Resolves /notes/<slug>/figures/<name>.svg to {w,h} via the .json sidecar
// written by scripts/build-tikz-single.mjs, falling back to parsing the
// SVG root attrs directly. Synchronous — safe for remark/rehype plugins.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..', '..');

function parseDims(svgText) {
  const tag = svgText.match(/<svg[^>]*>/)?.[0] ?? '';
  const num = (v) => {
    if (!v) return null;
    const m = String(v).match(/^([\d.]+)(pt|px)?$/);
    if (!m) return null;
    return Math.round(parseFloat(m[1]) * (m[2] === 'pt' ? 96 / 72 : 1));
  };
  const w =
    num(tag.match(/\swidth='([^']+)'/)?.[1] ?? tag.match(/\swidth="([^"]+)"/)?.[1]);
  const h =
    num(tag.match(/\sheight='([^']+)'/)?.[1] ?? tag.match(/\sheight="([^"]+)"/)?.[1]);
  if (w && h) return { w, h };
  const vb = tag
    .match(/viewBox=['"]([\d.\s-]+)['"]/)?.[1]
    ?.trim()
    .split(/\s+/)
    .map(Number);
  if (vb?.length === 4 && vb[2] > 0 && vb[3] > 0)
    return { w: Math.round(vb[2]), h: Math.round(vb[3]) };
  return null;
}

export function dimsForSrc(src) {
  const m = String(src || '').match(/^\/notes\/([^/]+)\/figures\/([^/]+\.svg)$/);
  if (!m) return null;
  const [, slug, file] = m;
  const base = join(ROOT, 'public', 'notes', slug, 'figures', file);
  try {
    if (existsSync(`${base}.json`)) {
      const d = JSON.parse(readFileSync(`${base}.json`, 'utf8'));
      if (Number.isFinite(d.w) && Number.isFinite(d.h) && d.w > 0 && d.h > 0)
        return d;
    }
  } catch {
    /* fall through to SVG parse */
  }
  try {
    if (existsSync(base)) return parseDims(readFileSync(base, 'utf8'));
  } catch {
    return null;
  }
  return null;
}
