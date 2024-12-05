import axios from "axios";
import { dummyHistoricalData } from "../config/chart/dummyData/Historical";
import { Coin, Currencies, Historical, SingleCoin } from "../context/types";
import { dummyTrendCoinsData } from "../config/chart/dummyData/TrendCoins";
import { dummyCoinListData } from "../config/chart/dummyData/CoinList";
import {
  CurrenciesDummy,
  dummySingleCoinData,
  SingleCoinDummy,
} from "../config/chart/dummyData/SingleCoin";

export const configForUseQuery = {
  refetchInterval: 300000,
  // refetchIntervalInBackground: true,
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
};

export const fetchCoinList = async (currency: Currencies, page?: number) => {
  try {
    const { data } = await axios.get<Coin[]>(
      `/api/coin-list?currency=${currency}&page=${page}`
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchSingleCoin = async (id: string, currency: Currencies) => {
  try {
    const { data } = await axios.get<SingleCoin>(
      `/api/single-coin?id=${id}&currency=${currency}`
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchTrendCoins = async (currency: Currencies) => {
  try {
    const { data } = await axios.get<Coin[]>(
      `/api/trend-list?currency=${currency}`
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchHistorical = async (
  id: string,
  currency: Currencies,
  days: number
): Promise<Historical> => {
  const { data } = await axios.get<Historical>(
    `/api/historical?id=${id}&currency=${currency}&days=${days}`
  );
  return data;
};

// dummy data
export const fetchCoinListDummy = async (currency: Currencies) => {
  return dummyCoinListData as Coin[];
};

export const fetchSingleCoinDummy = async (
  id: string,
  currency: CurrenciesDummy
) => {
  return dummySingleCoinData as SingleCoinDummy;
};

export const fetchTrendCoinsDummy = async (currency: Currencies) => {
  return dummyTrendCoinsData as Coin[];
};

export const fetchHistoricalDummy = async (
  id: string,
  currency: Currencies,
  days: number
): Promise<Historical> => {
  return dummyHistoricalData as Historical;
};
