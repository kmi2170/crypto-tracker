# Crypto Tracker

An app to track cryptocurrency prices, powerd by
[CoinGecko API](https://www.coingecko.com/en/api) (Api key is required)

## Features
- Top 15 trend coins
- Table of coins ranked by market cap with pagination feature.
- By clicking each coin in the trend or the table, go to each coin information page with historical chart
- Histrical charts
 - Price, market-cap,total volume
 - Period (24 hours, 30 days, 3 months, 1 year)
 - Chart can be horizontally zoom with mouse wheel.
- Currencies in USD, EURO and JPY (Japanese Yen)

## Techs
Built with Next.js, TypeScriptj, Tanstack Query and Material UI

### API End Points
- [Coin Gekko API](https://docs.coingecko.com/v3.0.1/reference/introduction)) (Public API (Demo plan) is free)

## Getting Started
- Local enviroment
  - yarn dev, or yarn start (after yarn build) 

Open http://localhost:3000 (or appropriate address) with your browser to see the result.
