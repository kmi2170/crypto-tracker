import { User } from "firebase/auth";

export interface ContextProps {
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  symbol: string;
  alert: Alert;
  setAlert: React.Dispatch<React.SetStateAction<Alert>>;
  user: User | null;
  watchlist: string[];
}

export interface Alert {
  open: boolean;
  message?: string;
  type?: string;
}

export interface ProviderProps {
  children: React.ReactNode;
}

export interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price_change_percentage_24h: number;
  current_price: number;
  market_cap: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
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
