import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const dir = join(import.meta.dirname, '..', 'src/content/notes');

for (const file of await readdir(dir)) {
  if (!file.endsWith('.md')) continue;
  const path = join(dir, file);
  let inFence = false;
  const lines = (await readFile(path, 'utf8')).split('\n').map((line) => {
    if (/^```/.test(line.trim())) {
      inFence = !inFence;
      return line;
    }
    if (inFence) return line;
    if (/^#### /.test(line)) return `### ${line.slice(5)}`;
    if (/^# /.test(line)) return `## ${line.slice(2)}`;
    return line;
  });

  let text = lines.join('\n');
  text = text.replace(/^## References \{#bibliography \.unnumbered\}\s*$/m, '## References');
  text = text.replace(/^## The Evolution of Optimizers \{#sec:optimizers\}\s*$/m, '## The Evolution of Optimizers');
  await writeFile(path, text);
}
