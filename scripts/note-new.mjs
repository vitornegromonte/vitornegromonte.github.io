// Scaffold a new note: bun run note:new -- "My Title"
// Creates src/content/notes/<slug>.md with valid frontmatter.
import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const title = process.argv.slice(2).join(' ').replace(/^--\s*/, '').trim();
if (!title) {
  console.error('Usage: bun run note:new -- "Note Title"');
  process.exit(1);
}
const slug = title
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const ROOT = join(import.meta.dirname, '..');
const out = join(ROOT, 'src/content/notes', `${slug}.md`);
if (existsSync(out)) {
  console.error(`Exists: ${out}`);
  process.exit(1);
}

await writeFile(
  out,
  `---\ntitle: "${title.replace(/"/g, '\\"')}"\ntopic: "TODO: short topic"\nlang: "EN"\n---\n\n# ${title}\n\nIntro paragraph.\n\n## Section\n\nProse with $inline$ math and:\n\n$$display = math$$\n\n![Caption with $math$.](/notes/${slug}/figures/fig-<hash>.svg){#fig-example}\n\nReference it as @fig-example.\n`,
  'utf8',
);
await mkdir(join(ROOT, 'public', 'notes', slug, 'figures'), { recursive: true });
console.log(`Created ${out}`);
