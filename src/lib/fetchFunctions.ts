import axios from "axios";

export const configForUseQuery = {
  // refetchInterval: 300000,
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
) => {
  const { data } = await axios.get(
    `/api/historical?id=${id}&currency=${currency}&days=${days}`
  );
  return data;
};
