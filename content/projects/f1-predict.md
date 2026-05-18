---
id: 4
title: "F1Predict - Formula 1 Race Prediction"
year: "2025"
category: "Predictive Modeling"
tags: ["Python", "NLP", "Machine Learning"]
image: "/images/f1predict.png"
projectUrl: "#"
codeUrl: "#"
summary: "Built a system for predicting Formula 1 race outcomes, including data collection, feature engineering, model training, and deployment. Achieved 1-second prediction error."
---

Formula 1 racing combines engineering precision with human skill, making race outcome prediction a challenging and intriguing problem. This project develops an end-to-end machine learning pipeline for predicting lap times and race results.

## Overview

The system collects historical race data including driver performance, car specifications, weather conditions, and track characteristics. A feature engineering pipeline extracts relevant signals such as tire degradation rates, pit stop strategies, and qualifying performance.

## Methodology

Multiple regression and ensemble models were evaluated, including gradient boosting, random forests, and neural networks. Feature importance analysis revealed that tire compound choice and track temperature are among the strongest predictors of lap time variance. The final model uses an ensemble of gradient boosted trees optimized for sequential race data.

## Results

The system achieved a mean absolute error of approximately 1 second per lap prediction — a competitive result given the stochastic nature of motor racing. The model also demonstrated strong performance in predicting final race standings, correctly identifying podium finishers in over 60% of test races.
