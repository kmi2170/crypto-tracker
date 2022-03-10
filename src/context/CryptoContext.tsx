import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { onAuthStateChanged, Unsubscribe, User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';

import { CoinList } from '../config/api';
import { auth } from '../lib/firebase';
import { db } from '../lib/firebase';

interface ContextProps {
  currency: string;
  symbol: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  coins: string[];
  loading: boolean;
  fetchCoins: () => void;
  alert: Alert;
  setAlert: React.Dispatch<React.SetStateAction<Alert>>;
  user: User | null;
  watchlist: string[];
}

type Alert = {
  open: boolean;
  message?: string;
  type?: string;
};

export const CryptoContext = createContext({} as ContextProps);

interface ProviderProps {
  children: React.ReactNode;
}

const CryptoProvider = ({ children }: ProviderProps) => {
  const [currency, setCurrency] = useState('USD');
  const [symbol, setSymbol] = useState('$');
  const [coins, setCoins] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [alert, setAlert] = useState<Alert>({
    open: false,
    message: '',
    type: 'success',
  });
  const [watchlist, setWatchlist] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, 'watchlist', user.uid);

      const unsubscribe: Unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          console.log(coin.data().coins);

          setWatchlist(coin.data().coins);
        } else {
          console.log('No Items in Watchlist');
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
      // console.log(user);
    });
  }, []);

  const fetchCoins = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(CoinList(currency));

      setCoins(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (currency === 'USD') setSymbol('$');
    else if (currency === 'EUR') setSymbol('€');
    else if (currency === 'JPY') setSymbol('¥');
  }, [currency]);

  const value = {
    currency,
    symbol,
    setCurrency,
    coins,
    loading,
    fetchCoins,
    alert,
    setAlert,
    user,
    watchlist,
  };

  return (
    <CryptoContext.Provider value={value}>{children}</CryptoContext.Provider>
  );
};

export default CryptoProvider;

export const CryptoState = () => {
  return useContext<ContextProps>(CryptoContext);
};
