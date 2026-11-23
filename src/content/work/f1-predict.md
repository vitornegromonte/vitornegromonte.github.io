---
title: "F1Predict - Formula 1 Race Prediction"
keyword: "Formula 1"
# TODO(verify): "1-second prediction error" also appears in the body — confirm metric, baseline, and evaluation setup (see results note below).
summary: "Built a system for predicting Formula 1 race outcomes, including data collection, feature engineering, model training, and deployment. Achieved 1-second prediction error."
role: "ML Engineer — Predictive Modeling"
date: 2025-09-01
tags: ['Python', 'NLP', 'Machine Learning']
featured: true
draft: false
category: "Predictive Modeling"
problem: "TODO: describe the problem F1Predict solves — what is predicted, for whom, and why it is hard."
approach: "TODO: describe the approach — data collection, feature engineering, model training, deployment."
results:
  - value: "1-second prediction error"
    note: "TODO: add the metric name, the baseline, and the evaluation setup for this number before publishing it."
abstract: "Built a system for predicting Formula 1 race outcomes, including data collection, feature engineering, model training, and deployment. Achieved 1-second prediction error."
---

<!-- TODO(copy): the two introductory paragraphs below repeat the same "end-to-end pipeline" sentence — merge into one. -->
<!-- TODO(verify): numeric claims in this paragraph — "mean absolute error of approximately 1 second per lap" (metric name, baseline, evaluation setup?) and "podium finishers in over 60% of test races". -->

We built an end-to-end machine learning pipeline for predicting Formula 1 lap times and race outcomes. The system combines historical race data with feature engineering across driver performance, car specifications, and weather conditions. An ensemble of gradient boosted trees achieves a mean absolute error of approximately 1 second per lap and identifies podium finishers in over 60% of test races.

Formula 1 racing combines engineering precision with human skill, making race outcome prediction a challenging and intriguing problem. This project develops an end-to-end machine learning pipeline for predicting lap times and race results.

## Overview

The system collects historical race data including driver performance, car specifications, weather conditions, and track characteristics. A feature engineering pipeline extracts relevant signals such as tire degradation rates, pit stop strategies, and qualifying performance.

## Methodology

Multiple regression and ensemble models were evaluated, including gradient boosting, random forests, and neural networks. Feature importance analysis revealed that tire compound choice and track temperature are among the strongest predictors of lap time variance. The final model uses an ensemble of gradient boosted trees optimized for sequential race data.

## Results

<!-- TODO(verify): repeats the intro's numeric claims — "approximately 1 second per lap" MAE and "over 60% of test races" podium hit rate. Confirm both before publishing. -->

The system achieved a mean absolute error of approximately 1 second per lap prediction — a competitive result given the stochastic nature of motor racing. The model also demonstrated strong performance in predicting final race standings, correctly identifying podium finishers in over 60% of test races.
