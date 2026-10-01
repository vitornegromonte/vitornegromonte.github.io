import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// "work" entries live in src/content/work/*.md
// Each file's `id` is derived from its filename, e.g. mars.md -> "mars",
// which becomes the project URL at /mars.
const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(240),
    role: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    url: z.url().optional(),
    repo: z.url().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    category: z.string().optional(),
    abstract: z.string().optional(),
    keyword: z.string().optional(),
    acrostic: z.boolean().optional(),
  }),
});

// "publications" entries live in src/content/publications/*.md
const publications = defineCollection({
  loader: glob({ base: './src/content/publications', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    year: z.string(),
    venue: z.string(),
    venueDetails: z.string().optional(),
    pdfUrl: z.url().optional(),
    citeUrl: z.url().optional(),
    codeUrl: z.url().optional(),
    summary: z.string().optional(),
  }),
});

// "notes" entries live in src/content/notes/*.md — markdown study notes with
// KaTeX math ($…$/$$…$$) and tufte sidenotes. The file id (e.g. world-models)
// becomes the note URL at /notes/world-models.
const notes = defineCollection({
  loader: glob({ base: './src/content/notes', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    topic: z.string(),
    lang: z.string(),
  }),
});

// "posts" entries live in src/content/posts/*.md — blog posts. They reuse
// the notes reading layout; the file id becomes the URL at /blog/<id>.
const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(240).optional(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    lang: z.string().default('EN'),
    draft: z.boolean().default(false),
  }),
});

// "about" is a single file (src/content/about/index.md): role + interest and
// tool lists in frontmatter, bio paragraphs as the body. Editable in the
// local admin panel like any other collection.
const about = defineCollection({
  loader: glob({ base: './src/content/about', pattern: '**/*.md' }),
  schema: z.object({
    role: z.string(),
    interests: z.array(z.string()).default([]),
    tools: z.array(z.string()).default([]),
  }),
});

export const collections = { work, publications, notes, posts, about };
