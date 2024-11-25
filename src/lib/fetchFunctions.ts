import axios from "axios";

import { CoinList, TrendingCoins } from "../config/api-endpoints";

export const configForUseQuery = {
  // refetchInterval: 300000,
  // refetchIntervalInBackground: true,
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
  // onSuccess: () => {
  //   console.log("Success data fetching");
  // },
};

export const fetchCoins = async (currency: string) => {
  try {
    const { data } = await axios.get(CoinList(currency));

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchTrendCoins = async (currency: string) => {
  try {
    const { data } = await axios.get(TrendingCoins(currency));

    return data;
  } catch (error) {
    console.error(error);
  }
};
