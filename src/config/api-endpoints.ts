import { log } from "console";

const baseUrl = "https://api.coingecko.com/api/v3";

export const CoinList = (currency: string, page: number = 1) =>
  `${baseUrl}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=30&page=${page}&sparkline=false`;

export const SingleCoin = (id: string) => {
  const searchParamsObj = {
    x_cg_demo_api_key: process.env.NEXT_COIN_GECKO_DEMO_API_KEY as string,
  };
  const searchParams = new URLSearchParams(searchParamsObj).toString();
  const subUrl = `coins/${id}?${searchParams}`;
  const url = `${baseUrl}/${subUrl}`;

  return url;
};

export const HistoricalChart = (id: string, currency: string, days: string) => {
  const searchParamsObj = {
    x_cg_demo_api_key: process.env.NEXT_COIN_GECKO_DEMO_API_KEY as string,
    vs_currency: currency,
    days,
    precision: "full",
  };
  const searchParams = new URLSearchParams(searchParamsObj).toString();
  const subUrl = `coins/${id}/market_chart?${searchParams}`;
  const url = `${baseUrl}/${subUrl}`;
  console.log(url);

  return url;
};

export const TrendingCoins = (currency: string) => {
  const searchParamsObj = {
    x_cg_demo_api_key: process.env.NEXT_COIN_GECKO_DEMO_API_KEY as string,
  };
  const searchParams = new URLSearchParams(searchParamsObj).toString();
  const subUrl = `search/trending?${searchParams}`;
  const url = `${baseUrl}/${subUrl}`;

  return url;
};
