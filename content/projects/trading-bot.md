---
id: 5
title: "Trading Bot"
year: "2025"
category: "College Project"
tags: ["C++", "Trading", "Automation"]
image: "/images/trading-bot.png"
projectUrl: "https://github.com/vitornegromonte/trading-bot"
codeUrl: "https://github.com/vitornegromonte/trading-bot"
summary: "C++ trading bot for automated cryptocurrency and stock market transactions."
---

Automated trading systems enable rapid execution of complex trading strategies without human intervention. This project implements a high-performance trading bot in C++ for cryptocurrency and stock markets.

## Overview

The bot connects to exchange APIs (Binance, Alpaca) via WebSocket for real-time market data streaming and order execution. It supports configurable trading strategies including moving average crossovers, mean reversion, and momentum-based approaches.

## Architecture

The system is built with a modular event-driven architecture. A data ingestion module handles market data streams, a strategy engine evaluates trading signals, a risk management module enforces position limits and stop-losses, and an execution module submits orders. All components run asynchronously to minimize latency.

## Performance

Backtesting on historical data across multiple market conditions demonstrated consistent profitability for the implemented strategies. The C++ implementation provides sub-millisecond order execution latency, critical for high-frequency trading scenarios. The project includes comprehensive logging and performance monitoring tools.
