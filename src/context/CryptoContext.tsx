import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { onAuthStateChanged, Unsubscribe, User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';

import { auth } from '../lib/firebase';
import { db } from '../lib/firebase';
import { CoinList } from '../config/api';
import { ContextProps, ProviderProps, Alert, Coin } from './types';

export const CryptoContext = createContext({} as ContextProps);

const CryptoProvider = ({ children }: ProviderProps) => {
  const [currency, setCurrency] = useState('USD');
  const [symbol, setSymbol] = useState('$');
  const [coins, setCoins] = useState<Coin[]>([]);
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
    setCoins,
    loading,
    setLoading,
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
