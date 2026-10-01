// Static SEO audit: compares dist/ of the original site vs this template.
// Usage: bun scripts/audit-seo.mjs [origDist] [newDist]
// Zero dependencies — regex parsing is enough for these assertions.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ORIG = process.argv[2] ?? join(import.meta.dirname, '..', '..', 'vitornegromonte.github.io', 'dist');
const NEW = process.argv[3] ?? join(import.meta.dirname, '..', 'dist');

function collectPages(dist) {
  const out = [];
  const walk = (dir) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.isFile() && e.name === 'index.html') out.push(p);
    }
  };
  walk(dist);
  return out;
}

function meta(html, name) {
  const m = html.match(new RegExp(`<meta[^>]+(?:name|property)="${name}"[^>]*>`, 'i'));
  const c = m?.[0].match(/content="([^"]*)"/i);
  return c ? c[1] : null;
}

function eachImg(html, cb) {
  // Quote-aware <img> matcher: alts may contain `>` (KaTeX spans), so a
  // naive [^>]* truncates the tag and misses trailing width/height.
  const re = /<img(?:[^>"']|"[^"]*"|'[^']*')*>/g;
  let m;
  while ((m = re.exec(html)) !== null) cb(m[0]);
}

function auditPage(path, dist) {
  const html = readFileSync(path, 'utf8');
  const route = `/${relative(dist, path).replace(/index\.html$/, '')}`;
  const titles = [...html.matchAll(/<title>([^<]*)<\/title>/g)].map((m) => m[1]);
  const desc = meta(html, 'description');
  const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] ?? null;
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  let tikz = 0;
  let tikzUnsized = 0;
  eachImg(html, (tag) => {
    if (!/\/figures\//.test(tag)) return;
    tikz++;
    if (!/width=/.test(tag) || !/height=/.test(tag)) tikzUnsized++;
  });
  const darkRefs = (html.match(/-dark\.svg|tikz-dark|tikz-light/g) || []).length;
  const mathml = (html.match(/katex-mathml/g) || []).length;
  const clientJs = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1]);
  const jsonld = (html.match(/application\/ld\+json/g) || []).length;
  const og = ['og:title', 'og:description', 'og:image', 'og:url', 'og:site_name'].map((k) => [k, meta(html, k)]);
  let noAlt = 0;
  eachImg(html, (tag) => {
    if (!/\balt=/.test(tag)) noAlt++;
  });
  return {
    route, titles, descLen: desc?.length ?? 0, canonical, h1,
    tikz, tikzUnsized, darkRefs, mathml,
    clientJs: clientJs.length, jsonld, ogMissing: og.filter(([, v]) => !v).map(([k]) => k),
    noAlt, bytes: Buffer.byteLength(html),
  };
}

function dirSize(dir) {
  let total = 0;
  const walk = (d) => {
    if (!existsSync(d)) return;
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.isFile()) total += statSync(p).size;
    }
  };
  walk(dir);
  return total;
}

function kb(n) {
  return `${(n / 1024).toFixed(1)}KB`;
}

for (const [label, dist] of [['ORIGINAL', ORIG], ['NEW', NEW]]) {
  console.log(`\n===== ${label} (${dist}) =====`);
  const pages = collectPages(dist);
  console.log(`pages: ${pages.length}`);
  let fails = 0;
  const check = (ok, msg) => {
    if (!ok) {
      fails++;
      console.log(`  FAIL ${msg}`);
    }
  };
  for (const p of pages.sort()) {
    const a = auditPage(p, dist);
    check(a.titles.length === 1, `${a.route}: titles=${a.titles.length}`);
    check(a.descLen >= 50 && a.descLen <= 200, `${a.route}: desc len=${a.descLen}`);
    check(!!a.canonical, `${a.route}: missing canonical`);
    check(a.h1 === 1, `${a.route}: h1 count=${a.h1}`);
    check(a.ogMissing.length === 0, `${a.route}: missing ${a.ogMissing.join(',')}`);
    check(a.noAlt === 0, `${a.route}: imgs without alt=${a.noAlt}`);
    if (a.tikz > 0) check(a.tikzUnsized === 0, `${a.route}: unsized tikz=${a.tikzUnsized}/${a.tikz}`);
  }
  const robots = existsSync(join(dist, 'robots.txt')) ? readFileSync(join(dist, 'robots.txt'), 'utf8') : '';
  check(/Sitemap: https:\/\/vitornegromonte\.github\.io\/sitemap-index\.xml/.test(robots), 'robots.txt sitemap URL');
  const sitemap = existsSync(join(dist, 'sitemap-0.xml')) ? readFileSync(join(dist, 'sitemap-0.xml'), 'utf8') : '';
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const missing = urls.filter((u) => {
    const rel = new URL(u).pathname.replace(/\/$/, '') || '/index';
    return !existsSync(join(dist, `.${rel === '/index' ? '' : rel}`, 'index.html')) && !existsSync(join(dist, `.${new URL(u).pathname}`, 'index.html'));
  });
  check(urls.length > 0 && missing.length === 0, `sitemap: ${urls.length} urls, missing=${missing.join(',') || 'none'}`);
  const rss = existsSync(join(dist, 'rss.xml'));
  check(rss, 'rss.xml exists');
  console.log(`sitemap urls: ${urls.length}, rss: ${rss ? 'yes' : 'NO'}`);
  console.log(`figures payload: ${kb(dirSize(join(dist, 'notes')))} | html total: ${kb(pages.reduce((s, p) => s + statSync(p).size, 0))} | _astro: ${kb(dirSize(join(dist, '_astro')))}`);
  console.log(`page fails: ${fails}`);
}
