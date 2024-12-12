import axios from "axios";
import {
  Coin,
  Currencies,
  Historical,
  Search,
  SingleCoin,
  Trends,
} from "../api/types";
import { DaysValue } from "../config/chart/chartButtons";

export const configForUseQuery = {
  refetchInterval: 300000,
  // refetchIntervalInBackground: true,
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
};

export const fetchCoinList = async (
  currency: Currencies,
  page: number = 1,
  per_page: number = 50
) => {
  try {
    const { data } = await axios.get<Coin[]>(
      `/api/coin-list?currency=${currency}&page=${page}&per_page=${per_page}`
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchSingleCoin = async (id: string) => {
  try {
    const { data } = await axios.get<SingleCoin>(`/api/single-coin?id=${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchTrendCoins = async () => {
  try {
    const { data } = await axios.get<Trends>(`/api/trend-list`);

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchHistorical = async (
  id: string,
  currency: Currencies,
  days: DaysValue
): Promise<Historical> => {
  const { data } = await axios.get<Historical>(
    `/api/historical?id=${id}&currency=${currency}&days=${days}`
  );
  return data;
};

export const fetchCandidateCoins = async (query: string): Promise<Search> => {
  const { data } = await axios.get<Search>(`/api/search?query=${query}`);
  return data;
};

// dummy data
// export const fetchCoinListDummy = async (currency: Currencies) => {
//   return dummyCoinListData as Coin[];
// };

// export const fetchSingleCoinDummy = async (
//   id: string,
//   currency: CurrenciesDummy
// ) => {
//   return dummySingleCoinData as SingleCoinDummy;
// };

// export const fetchTrendCoinsDummy = async (currency: Currencies) => {
//   return dummyTrendCoinsData as Coin[];
// };

// export const fetchHistoricalDummy = async (
//   id: string,
//   currency: Currencies,
//   days: number
// ): Promise<Historical> => {
//   return dummyHistoricalData as Historical;
// };
