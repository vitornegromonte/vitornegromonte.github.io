# Writing notes

One markdown file per note. Math (`$…$`, `$$…$$`) renders at build time —
no client JS. Everything below is plain markdown plus three small
conventions.

## Figures

Compiled diagrams and images are one-liners. Captions support `$math$`
(escape a literal dollar as `\$`):

```md
![Computational graph for $L = (a\times b)+c$.](/notes/autodiff/figures/fig-24552d20bc.svg){#fig-comp-graph}
```

New TikZ figures are fenced in-note (compiled + optimized at prebuild,
cached by content hash — needs `pdflatex` + `dvisvgm` locally):

~~~
```tikz {#fig-my-diagram}
\begin{tikzpicture}
  …
\end{tikzpicture}
\caption{What the diagram shows, with $math$.}
```
~~~

Add `.fullwidth` after the id for 3+ panel figures: `{#fig-big .fullwidth}`.

Reference any figure from prose with `@fig-comp-graph` — it becomes a
"Figure N" link, numbered automatically in document order. Never
hand-write "Figure 7".

## Sidenotes and side figures

```md
```sidenote
Friston, "The free-energy principle: a unified brain theory?"
```
```

Blocks are auto-numbered — no `note-no` spans. Side figures:

```md
```marginfigure
![Latent rollout.](/notes/world-models/figures/fig0.svg)
```
```

## Tables

Put the caption as an italic line right after the table:

```md
| A | B |
|---|---|
| 1 | 2 |

*Forward pass for $L = (a\times b)+c$.*
```

## Commands

- `bun run note:new -- "Title"` — scaffold file + figures dir
- `bun run note:check` — frontmatter, missing figure files, empty alts,
  unresolved `@fig-` refs, leftover legacy markup
- `bun run dev` / `bun run build` — preview / full build
