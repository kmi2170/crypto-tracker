export interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price_change_percentage_24h: number;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  sparkline_in_7d: { price: number[] };
}

export interface WatchList {
  id: string;
  name: string;
  market_cap_rank: number;
  imgUrl: string;
}

export interface Search {
  coins: CoinSearch[];
}

export interface CoinSearch {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
}

export interface Trends {
  coins: { item: TrendCoin }[];
}

export interface TrendCoin {
  id: string;
  coin_id: string;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  small: string;
  large: string;
  slug: string;
  price_btc: number;
  score: number;
  data: {
    price: number;
    price_btc: string;
    price_change_percentage_24h: Record<string, number>;
    market_cap: number;
    total_volume: number;
    total_volume_btc: number;
    sparkline: string;
    content: string;
  };
}
export interface SingleCoin {
  id: string;
  symbol: string;
  name: string;
  description: Record<string, string>;
  market_data: {
    current_price: Record<string, number>;
    market_cap: Record<string, number>;
  };
  market_cap_rank: number;
  image: { thumb: string; small: string; large: string };
  price_change_percentage_24h: number;
  current_price: number;
  market_cap: number;
}

export interface Historical {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export type Currencies = "usd" | "eur" | "jpy";
