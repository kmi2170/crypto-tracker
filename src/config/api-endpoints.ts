const baseUrl = "https://api.coingecko.com/api/v3";

export const CoinList = (currency: string) =>
  `${baseUrl}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=30&page=1&sparkline=false`;

export const SingleCoin = (id: string, currency: string) =>
  `${baseUrl}/coins/${id}?vs_currency=${currency}&community_data=false&developer_data=false&tickers=false`;

export const HistoricalChart = (id: string, currency: string, days: string) =>
  `${baseUrl}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const TrendingCoins = (currency: string) =>
  `${baseUrl}/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;
