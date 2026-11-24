---
title: "CeetLode"
keyword: "Code review"
summary: "Built a local-first code-review practice app where developers explain supplied solutions, propose optimizations, and compare their reasoning with curated rubrics."
role: "Software Engineer — Full-Stack"
date: 2026-08-01
tags: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Redis']
featured: true
draft: false
category: "Developer Tool"
url: "https://github.com/vitornegromonte/CeetLode"
repo: "https://github.com/vitornegromonte/CeetLode"
problem: "Agentic coding increasingly shifts developer work toward reading, evaluating, and improving existing code. Yet traditional LeetCode-style practice focuses on writing solutions from a prompt, leaving code-review skills and engineering judgment undertrained."
approach: "CeetLode reverses the coding exercise loop: users inspect supplied Python solutions, explain how they work, propose concrete optimizations, and compare their responses with curated rubrics and revealable reference answers."
abstract: "Built a local-first code-review practice app where developers explain supplied solutions, propose optimizations, and compare their reasoning with curated rubrics."
---

CeetLode is a browser-based code-review practice platform inspired by LeetCode. Instead of asking developers to implement an unseen solution, it gives them working code and asks them to analyze it, communicate its behavior clearly, and identify meaningful improvements.

The core practice loop is deliberately structured:

1. Read and inspect a supplied Python solution.
2. Explain what the code does and how it works.
3. Propose optimizations and justify the tradeoffs.
4. Submit the review and compare it with a curated rubric and reference answer.

## Architecture

CeetLode uses a separate React and FastAPI application with Docker Compose for local or private-network development:

```text
Browser — React / Vite
  │
  │ HTTP JSON
  ▼
FastAPI
  │
  ├──► SQLAlchemy ──► PostgreSQL
  └──► Redis client ──► Redis
```

PostgreSQL stores exercises, rubrics, reference answers, finalized submissions, and progress. Redis holds replaceable draft submissions with automatic expiry. Finalized submissions remain immutable and are retained as separate records.

The frontend uses React, React Router, TanStack Query, Tailwind CSS, and CodeMirror. The backend uses FastAPI, Pydantic, SQLAlchemy, Alembic, and uv-managed Python dependencies.

## Practice and Review Flow

The initial MVP includes five curated Python exercises covering common algorithm and data-structure patterns such as pair lookup, nested-loop optimization, binary search, stack validation, and sliding windows.

Both an explanation and an optimization proposal are required before submission. After finalization, the app reveals the exercise rubric and reference answer without using AI for grading or feedback.

The MVP excludes accounts, public leaderboards, AI-generated review feedback, and a direct browser-to-database connection. It is designed to be self-hosted by one developer or used on a private network.