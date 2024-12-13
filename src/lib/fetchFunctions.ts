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

export async function fetchProject(id: string): Promise<{
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
}> {
  console.info("Fetching project:", id);

  const response = await fetch(`https://api.github.com/repos/${id}`);
  await new Promise((r) => setTimeout(r, 1000));
  return await response.json();
}

export const fetchTrendCoins = async (): Promise<Trends> => {
  const { data } = await axios.get<Trends>(`${baseUrl}/api/trend-list`);
  return data;
};
// export const fetchTrendCoins = async () => {
//   try {
//     const { data } = await axios.get<Trends>(`/api/trend-list`);

//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// };

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
