import { User } from 'firebase/auth';

export interface ContextProps {
  currency: string;
  symbol: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  coins: Coin[];
  setCoins: React.Dispatch<React.SetStateAction<Coin[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fetchCoins: () => void;
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
  id: number;
  name: string;
  symbol: string;
  image: string;
  price_change_percentage_24h: number;
  current_price: number;
  market_cap: number;
}
