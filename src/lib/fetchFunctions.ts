"use client";

import { isServer } from "@tanstack/react-query";
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

function getBaseURL() {
  if (!isServer) {
    return "";
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

const baseUrl = getBaseURL();

export const fetchCoinList = async (
  currency: Currencies,
  page: number = 1,
  per_page: number = 50
): Promise<Coin[]> => {
  const { data } = await axios.get<Coin[]>(
    `${baseUrl}/api/coin-list?currency=${currency}&page=${page}&per_page=${per_page}`
  );

  return data;
};

export const fetchSingleCoin = async (id: string): Promise<SingleCoin> => {
  const { data } = await axios.get<SingleCoin>(
    `${baseUrl}/api/single-coin?id=${id}`
  );
  return data;
};

export const fetchTrendCoins = async (): Promise<Trends> => {
  const { data } = await axios.get<Trends>(`${baseUrl}/api/trend-list`);
  return data;
};

export const fetchHistorical = async (
  id: string,
  currency: Currencies,
  days: DaysValue
): Promise<Historical> => {
  const { data } = await axios.get<Historical>(
    `${baseUrl}/api/historical?id=${id}&currency=${currency}&days=${days}`
  );
  return data;
};

export const fetchCandidateCoins = async (query: string): Promise<Search> => {
  const { data } = await axios.get<Search>(
    `${baseUrl}/api/search?query=${query}`
  );
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
