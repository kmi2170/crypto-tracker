const baseUrl = "https://api.coingecko.com/api/v3";

const api_key = process.env.COIN_GECKO_DEMO_API_KEY as string;

export const CoinList = (currency: string, page: string, per_page: string) => {
  const searchParamsObj = {
    vs_currency: currency,
    order: "market_cap_desc",
    page,
    per_page,
    x_cg_demo_api_key: api_key,
    sparkline: "true",
  };
  const searchParams = new URLSearchParams(searchParamsObj).toString();
  const subUrl = `coins/markets?${searchParams}`;
  const url = `${baseUrl}/${subUrl}`;

  return url;
};

export const SingleCoin = (id: string) => {
  const searchParamsObj = {
    x_cg_demo_api_key: api_key,
  };
  const searchParams = new URLSearchParams(searchParamsObj).toString();
  const subUrl = `coins/${id}?${searchParams}`;
  const url = `${baseUrl}/${subUrl}`;

  return url;
};

export const HistoricalChart = (id: string, currency: string, days: string) => {
  const searchParamsObj = {
    vs_currency: currency,
    days,
    precision: "full",
    x_cg_demo_api_key: api_key,
  };
  const searchParams = new URLSearchParams(searchParamsObj).toString();
  const subUrl = `coins/${id}/market_chart?${searchParams}`;
  const url = `${baseUrl}/${subUrl}`;

  return url;
};

export const TrendingCoins = () => {
  const searchParamsObj = {
    x_cg_demo_api_key: api_key,
  };
  const searchParams = new URLSearchParams(searchParamsObj).toString();
  const subUrl = `search/trending?${searchParams}`;
  const url = `${baseUrl}/${subUrl}`;

  return url;
};

export const Search = (query: string) => {
  const searchParamsObj = {
    query,
    x_cg_demo_api_key: api_key,
  };
  const searchParams = new URLSearchParams(searchParamsObj).toString();
  const subUrl = `search/?${searchParams}`;
  const url = `${baseUrl}/${subUrl}`;

  return url;
};
