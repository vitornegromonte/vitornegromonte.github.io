---
title: "Parkinson Diagnosis using Computer Vision: Campus Party'24 Keynote"
keyword: "Parkinson"
summary: "Created a CNN model for Parkinson's disease detection using spiral‐drawing images. Outperformed state‐of‐the‐art methods by ≈ 10%, achieving 95% accuracy on the benchmark dataset."
role: "ML Researcher — Computer Vision"
date: 2024-11-01
tags: ['Python', 'PyTorch', 'OpenCV', 'Optuna']
url: "https://github.com/vitornegromonte/CPNE2024"
repo: "https://github.com/vitornegromonte/CPNE2024"
featured: true
draft: false
category: "Computer Vision"
abstract: "Created a CNN model for Parkinson's disease detection using spiral‐drawing images. Outperformed state‐of‐the‐art methods by ≈ 10%, achieving 95% accuracy on the benchmark dataset."
---

This project develops a CNN-based diagnostic system for Parkinson's disease using computer vision analysis of spiral-drawing images. The model achieves 95% accuracy on a public benchmark, outperforming prior state-of-the-art methods by approximately 10 percentage points. Presented as a keynote at Campus Party 2024.

Parkinson's disease affects millions worldwide, and early diagnosis remains challenging. This project explores a non-invasive diagnostic approach using computer vision to analyze hand-drawn spirals — a standard clinical test for motor impairment.

## Overview

Patients with Parkinson's disease often exhibit characteristic tremors and motor dysfunctions that manifest in drawing tasks. By analyzing spiral drawings captured from digitizing tablets, we developed a CNN-based system capable of distinguishing Parkinson's patients from healthy controls with high accuracy.

## Dataset

The model was trained and evaluated on a public benchmark dataset of spiral drawings. Data augmentation techniques including rotation, scaling, and elastic deformations were applied to improve generalization. Hyperparameter optimization was performed using Optuna to maximize classification performance.

## Results

Our approach achieved 95% accuracy on the benchmark dataset, outperforming existing state-of-the-art methods by approximately 10 percentage points. The model was presented as a keynote at Campus Party 2024, demonstrating the potential of computer vision as a low-cost screening tool for Parkinson's disease.
