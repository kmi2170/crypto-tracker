import { User } from 'firebase/auth';

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
}
