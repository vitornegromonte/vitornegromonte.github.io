// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import { remarkTufte } from './src/lib/remark-tufte.mjs';
import { remarkTikzSingle } from './src/lib/remark-tikz-single.mjs';
import { remarkFigure } from './src/lib/remark-figure.mjs';
import { remarkFigLabels, remarkFigRefs } from './src/lib/remark-figref.mjs';
import { rehypeTikzDims } from './src/lib/rehype-tikz-dims.mjs';

// Production URL — powers the sitemap and canonical / Open Graph URLs.
const SITE_URL = 'https://vitornegromonte.github.io';

export default defineConfig({
  site: SITE_URL,

  integrations: [sitemap()],

  markdown: {
    processor: unified({
      // Order: labels harvested first, numbering/refs last (after all
      // figure HTML exists). See src/content/notes/README.md for syntax.
      remarkPlugins: [remarkMath, remarkFigLabels, remarkTikzSingle, remarkFigure, remarkTufte, remarkFigRefs],
      rehypePlugins: [rehypeRaw, rehypeTikzDims, [rehypeKatex, { throwOnError: false, strict: false }]],
    }),
    shikiConfig: {
      themes: {
        light: 'horizon-bright',
      },
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  // Three families (DM Serif Display / Lora / JetBrains Mono), self-hosted
  // at build time. Mono is for code only. Single light theme only.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'DM Serif Display',
      cssVariable: '--ff-display',
      weights: ['400'],
      subsets: ['latin'],
    },
    {
      provider: fontProviders.google(),
      name: 'Lora',
      cssVariable: '--ff-body',
      weights: ['400', '500', '600'],
      subsets: ['latin'],
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--ff-mono',
      weights: ['400', '700'],
      subsets: ['latin'],
    },
  ],
});
