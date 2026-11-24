---
title: "Spiral-drawing-based Parkinson Diagnosis"
keyword: "Parkinson"
summary: "Created a CNN model for exploratory Parkinson's disease screening using spiral-drawing images from a public benchmark. Campus Party 2024 Keynote"
role: "ML Researcher — Computer Vision"
date: 2024-11-01
tags: ['Python', 'PyTorch', 'OpenCV', 'Optuna']
url: "https://github.com/vitornegromonte/CPNE2024"
repo: "https://github.com/vitornegromonte/CPNE2024"
featured: false
draft: false
category: "Computer Vision"
abstract: "Created a CNN model for exploratory Parkinson's disease screening using spiral-drawing images from a public benchmark. Campus Party 2024 Keynote"
---

This project explores a CNN-based screening system for Parkinson's disease using computer vision analysis of spiral-drawing images. The work was presented as a keynote at Campus Party 2024.

Parkinson's disease affects millions worldwide, and early diagnosis remains challenging. This project explores a non-invasive diagnostic approach using computer vision to analyze hand-drawn spirals — a standard clinical test for motor impairment.

## Overview

Patients with Parkinson's disease often exhibit characteristic tremors and motor dysfunctions that manifest in drawing tasks. By analyzing spiral drawings, this project explores whether a CNN can distinguish between Parkinson's and healthy controls in a controlled benchmark setting.

## Dataset

The model was trained and evaluated on a public benchmark dataset of spiral drawings. Data augmentation techniques including rotation, scaling, and elastic deformations were applied to improve generalization. Hyperparameter optimization was performed using Optuna to maximize classification performance.

## Results

The benchmark experiment compares CNN configurations with evaluation data held out from training. The result is presented as a research prototype, not a clinical diagnostic system.
