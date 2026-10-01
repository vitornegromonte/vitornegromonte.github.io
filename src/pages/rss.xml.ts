import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: { site: URL }) {
  const notes = await getCollection('notes');
  const work = await getCollection('work', ({ data }) => !data.draft);

  return rss({
    title: 'Vitor Negromonte — Field Notes & Projects',
    description:
      'Data Scientist and Machine Learning Researcher working on latent reasoning, humanoid learning, and self-referential systems.',
    site: context.site,
    items: [
      ...notes.map((note) => ({
        title: note.data.title,
        description: `${note.data.title} — ${note.data.topic}`,
        link: `/notes/${note.id}/`,
      })),
      ...work.map((entry) => ({
        title: entry.data.title,
        description: entry.data.summary,
        link: `/${entry.id}/`,
        pubDate: entry.data.date,
      })),
    ],
  });
}
