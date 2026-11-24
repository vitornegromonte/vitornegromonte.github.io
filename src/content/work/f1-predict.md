---
title: "F1Predict - Formula 1 Race Prediction"
keyword: "Formula 1"
summary: "Built a reproducible Formula 1 lap-time pipeline with real OpenF1 and weather data, versioned datasets and models, cross-validation, and local ONNX inference."
role: "ML Engineer — Data & Predictive Modeling"
date: 2026-08-01
tags: ['Python', 'ML', 'ONNX', 'CLI']
featured: true
draft: false
category: "Tabular"
problem: "Formula 1 lap times depend on changing track, weather, driver, and car conditions. A reliable pipeline needs real historical inputs, leakage-safe features, reproducible evaluation, and a simple local inference path."
approach: "F1Predict ingests OpenF1 and Open-Meteo data into versioned Parquet datasets, builds reproducible features, compares regression models with cross-validation, exports the selected model to ONNX, and exposes the full workflow through one Typer CLI."
abstract: "Built a reproducible Formula 1 lap-time pipeline with real OpenF1 and weather data, versioned datasets and models, cross-validation, and local ONNX inference."
---

F1Predict is an end-to-end pipeline for predicting Formula 1 lap times from real historical race data. It combines OpenF1 and hourly Open-Meteo weather inputs, reproducible feature engineering, versioned datasets and models, and local ONNX inference.

## Overview

The system incrementally ingests race data for 2023–2025, normalizes and validates it, and produces curated versioned Parquet datasets. Feature construction includes timing, driver, session, circuit, tire, pit, and weather signals while avoiding target leakage.

The `f1predict` CLI provides separate workflows for ingestion, training, evaluation, ONNX export, prediction, and optional PyTorch benchmarking.

## Methodology

Training uses cross-validation and automatic model selection across random forest, gradient boosting, histogram gradient boosting, and XGBoost. Evaluation reports MAE, RMSE, and R², and the resulting model can be exported to ONNX for inference without a server.

The implementation includes 29 tests and strict static checks across 34 Python files. Pandera schemas validate the data contracts, and dataset and model artifacts are identified through versioned manifests.

## Results

In the documented two-race smoke setup, training and evaluation report approximately 1.1 seconds MAE. This is a small end-to-end reproduction smoke check, not a full-season benchmark.

## Architecture

OpenF1 and Open-Meteo feed an incremental ETL pipeline with immutable raw JSON payloads. The extractor uses `httpx`, `tenacity`, and a token bucket for rate limiting; normalization then converts timestamps, integers, booleans, and categorical values before cleaning, Pandera validation, and curated Parquet output.

```text
OpenF1 API ──► RawStore ──► Normalize ───► Cleaning
                    │                          │
Open-Meteo ─────┘                           │
                                               ▼
                                      Validate ──► Curated
                                                      │
                                                      ▼
                                               Features
                                                      │
                                                      ▼
                                           Train + 3-fold CV
                                                      │
                                                      ▼
                                  Versioned datasets + model
                                                      │
                                                      ▼
                                     ONNX export ──► Local predict
```

The pipeline writes versioned snapshots, model artifacts, and a manifest containing the git commit, parameters, schema fingerprints, SHA256 hashes, and quality-report hash. The same entity schemas in `backend/app/etl/entities.py` are reused across normalization, cleaning, validation, SQLAlchemy loading, and versioning.

The Typer CLI exposes the complete workflow as six commands: `ingest`, `train`, `evaluate`, `export`, `predict`, and `benchmark`. Preprocessing is embedded in the joblib pipeline through a `ColumnTransformer`, while ONNX export uses a regressor-only fallback and validates that the numerical difference stays below `1e-4`.

## ETL Pipeline

The data flow is incremental and idempotent:

```text
OpenF1 API ─┐
             ├─► immutable JSON.gz ─► normalize ─► cleaning
Open-Meteo ─┘                                       │
                                                     ▼
                                               Pandera validation
                                                     │
                                                     ▼
                                  curated Parquet ─► versioned snapshots
                                                     │
                                                     ▼
                                        PostgreSQL via --load-db
```

### Data layers

| Layer | Contents | Git policy |
|---|---|---|
| `data/raw/` | Immutable API payloads grouped by source and entity key | Excluded |
| `data/staging/` | In-memory normalized records | Excluded |
| `data/curated/` | Cleaned Parquet data, flags, and quality report | Excluded |
| `data/versioned/vNNN/` | Immutable snapshots and `manifest.json` | Manifest only |

Each API entity-key pair is saved once and reused by later runs. Unique natural keys make database reloads safe through `ON CONFLICT DO UPDATE`.

### Quality and feature policy

- Timestamps use UTC; integer fields use nullable `Int64`; ordered tire compounds range from `SOFT` through `WET` and `UNKNOWN`.
- Missing natural keys are removed and counted in `quality_report.json`. A missing lap target keeps the row flagged with `has_target=False`.
- Lap durations outside 40–600 seconds and interval speeds outside 0–450 are flagged with `is_implausible`, never silently deleted.
- Pit duration is coalesced across lane, total, and pit fields; `stop_duration` is only available after the 2024 United States Grand Prix.
- Pandera gates enforce dtypes, natural-key uniqueness, ranges, and referential integrity before versioning. A failed gate blocks the snapshot.
- Rolling features use shifted values per session and driver: previous laps, three-lap aggregates, best lap so far, and laps completed.
- Tire age, stint progress, compound, hourly weather, and session/circuit context are joined through strict temporal or session keys.
- Numeric features use median imputation and standard scaling; categorical features use most-frequent imputation and one-hot encoding.

