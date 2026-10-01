---
title: "MARS: Multi Agent Recommendation System"
keyword: "MARS"
acrostic: true
summary: "Developed a FastAPI‐based system that automates research paper collection from ArXiv using LLM agents to review and filter relevant papers."
role: "Software Engineer — ML Systems"
date: 2025-04-01
tags: ['Python', 'NLP', 'FastAPI']
url: "https://github.com/vitornegromonte/mars"
repo: "https://github.com/vitornegromonte/mars"
featured: true
draft: false
category: "Productivity Tool"
abstract: "Developed a FastAPI‐based system that automates research paper collection from ArXiv using LLM agents to review and filter relevant papers."
---

We present MARS, a multi-agent system built with FastAPI that automates research paper collection and filtering from ArXiv. A team of LLM-powered agents — collector, reviewer, and summarizer — collaboratively curate relevant papers based on user-defined criteria, reducing the cognitive load of literature monitoring.

Keeping up with the ever-growing volume of academic research is a significant challenge. MARS addresses this by leveraging multiple LLM-powered agents to autonomously collect, review, and recommend relevant papers from ArXiv.

## Overview

MARS is a FastAPI-based system that coordinates a team of specialized agents: a collector agent fetches papers from ArXiv based on user-defined topics, a reviewer agent evaluates each paper's relevance using LLM-based reasoning, and a summarizer agent produces concise digests. The system supports customizable criteria and continuous monitoring of new publications.

## How it Works

Users define research topics and filtering criteria through a web interface. The collector agent periodically queries ArXiv for new submissions matching the user's interests. Each paper is then passed to the reviewer agent, which assesses relevance based on title, abstract, and full-text analysis. Relevant papers are summarized and presented in a personalized dashboard.

## Use Cases

MARS is particularly useful for researchers, graduate students, and R&D teams who need to stay current with literature in fast-moving fields like machine learning, NLP, and computational biology. The multi-agent architecture allows for easy extension to additional data sources beyond ArXiv.
