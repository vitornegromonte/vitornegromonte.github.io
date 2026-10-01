---
title: "Computer Vision in Breast Cancer Diagnosis: A Comparative Study with CBIS‐DDSM Data"
keyword: "Breast Cancer"
summary: "Performed a comparative study of multiple CNN architectures for early breast cancer detection using mammography images."
role: "ML Researcher — Computer Vision"
date: 2023-06-15
tags: ['Python', 'TensorFlow', 'OpenCV']
url: "https://github.com/vitornegromonte/breast_cancer-classification"
repo: "https://github.com/vitornegromonte/breast_cancer-classification"
featured: false
draft: false
category: "Computer Vision"
abstract: "Performed a comparative study of multiple CNN architectures for early breast cancer detection using mammography images."
---

This study systematically compares multiple CNN architectures — including custom CNNs, VGG16, ResNet50, and InceptionV3 — for early breast cancer detection from mammography images in the CBIS-DDSM dataset. ResNet50 with fine-tuned top layers achieves the highest overall performance, demonstrating that transfer learning and preprocessing choices significantly impact diagnostic accuracy.

Breast cancer remains one of the leading causes of cancer-related deaths worldwide. Early and accurate diagnosis significantly improves patient outcomes, and computer-aided diagnostic systems can assist radiologists in detecting malignancies from mammography images.

## Overview

This project conducts a systematic comparison of several convolutional neural network architectures applied to the CBIS-DDSM dataset, a curated subset of the Digital Database for Screening Mammography. The architectures evaluated include custom CNNs, VGG16, ResNet50, and InceptionV3, with various transfer learning strategies.

## Methodology

The CBIS-DDSM dataset was preprocessed using histogram equalization, normalization, and data augmentation techniques to address class imbalance. Each model was trained using transfer learning with ImageNet weights, fine-tuned on the mammography dataset. Performance was measured using accuracy, precision, recall, F1-score, and AUC-ROC curves.

## Findings

Preliminary results indicate that ResNet50 with fine-tuned top layers achieved the highest overall performance, with particular strength in reducing false-negative rates — a critical factor in clinical screening applications. The study also revealed that proper preprocessing significantly impacts model performance more than architecture choice alone.
