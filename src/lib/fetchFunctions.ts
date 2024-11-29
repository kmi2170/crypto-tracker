import axios from "axios";
import { dummyHistoricalData } from "../config/chart/dummyHistoricalData";
import { Historical } from "../context/types";

export const configForUseQuery = {
  refetchInterval: 300000,
  // refetchIntervalInBackground: true,
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
};

export const fetchCoinList = async (currency: string) => {
  try {
    const { data } = await axios.get(`/api/coin-list?currency=${currency}`);

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchSingleCoin = async (id: string, currency: string) => {
  try {
    const { data } = await axios.get(
      `/api/single-coin?id=${id}&currency=${currency}`
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchTrendCoins = async (currency: string) => {
  try {
    const { data } = await axios.get(`/api/trend-list?currency=${currency}`);

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchHistorical = async (
  id: string,
  currency: string,
  days: number
): Promise<Historical> => {
  const { data } = await axios.get<Historical>(
    `/api/historical?id=${id}&currency=${currency}&days=${days}`
  );
  return data;
};

export const fetchHistoricalDummy = async (
  id: string,
  currency: string,
  days: number
): Promise<Historical> => {
  return dummyHistoricalData as Historical;
};
