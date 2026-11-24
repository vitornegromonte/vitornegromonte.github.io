---
title: "Trading Bot"
keyword: "Trading Bot"
summary: "C++ trading bot for automated cryptocurrency and stock market transactions."
role: "Software Engineer — C++"
date: 2025-11-01
tags: ['C++', 'Trading', 'Automation']
url: "https://github.com/vitornegromonte/trading-bot"
repo: "https://github.com/vitornegromonte/trading-bot"
featured: false
draft: false
category: "College Project"
abstract: "C++ trading bot for automated cryptocurrency and stock market transactions."
---

We implemented an automated trading bot in C++ supporting cryptocurrency and stock markets. The system features an event-driven architecture with WebSocket-based market data ingestion, a configurable strategy engine, risk management, and asynchronous order execution.

## Overview

The bot connects to exchange APIs (Binance, Alpaca) via WebSocket for real-time market data streaming and order execution. It supports configurable trading strategies including moving average crossovers, mean reversion, and momentum-based approaches.

## Architecture

The system is built with a modular event-driven architecture. A data ingestion module handles market data streams, a strategy engine evaluates trading signals, a risk management module enforces position limits and stop-losses, and an execution module submits orders. All components run asynchronously to minimize latency.

## Performance

The project includes historical-data backtesting, strategy logging, and performance-monitoring tools. Results vary by market conditions and require fees, slippage, and benchmark assumptions before they can be compared reliably.
