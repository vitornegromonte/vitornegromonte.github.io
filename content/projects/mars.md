---
id: 3
title: "MARS: Multi Agent Recommendation System"
year: "2025"
category: "Productivity Tool"
tags: ["Python", "NLP", "FastAPI"]
image: "/images/mars.png"
projectUrl: "https://github.com/vitornegromonte/mars"
codeUrl: "https://github.com/vitornegromonte/mars"
summary: "Developed a FastAPI‐based system that automates research paper collection from ArXiv using LLM agents to review and filter relevant papers."
---

Keeping up with the ever-growing volume of academic research is a significant challenge. MARS addresses this by leveraging multiple LLM-powered agents to autonomously collect, review, and recommend relevant papers from ArXiv.

## Overview

MARS is a FastAPI-based system that coordinates a team of specialized agents: a collector agent fetches papers from ArXiv based on user-defined topics, a reviewer agent evaluates each paper's relevance using LLM-based reasoning, and a summarizer agent produces concise digests. The system supports customizable criteria and continuous monitoring of new publications.

## How it Works

Users define research topics and filtering criteria through a web interface. The collector agent periodically queries ArXiv for new submissions matching the user's interests. Each paper is then passed to the reviewer agent, which assesses relevance based on title, abstract, and full-text analysis. Relevant papers are summarized and presented in a personalized dashboard.

## Use Cases

MARS is particularly useful for researchers, graduate students, and R&D teams who need to stay current with literature in fast-moving fields like machine learning, NLP, and computational biology. The multi-agent architecture allows for easy extension to additional data sources beyond ArXiv.
