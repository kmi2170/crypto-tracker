import { useEffect } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { useQuery, QueryClient, dehydrate } from 'react-query';
import axios from 'axios';

import Banner from '../components/Banner/Banner';
import CoinsTable from '../components/CoinsTable';
import { CryptoState } from '../context/CryptoContext';
import { CoinList } from '../config/api';
import { Coin } from '../context/types';

const fetchCoins = async (currency: string) => {
  try {
    const { data } = await axios.get(CoinList(currency));

    return data;
  } catch (error) {
    console.error(error);
  }
};

const configRQ = {
  refetchInterval: 300000,
  refetchIntervalInBackground: true,
  onSuccess: () => {
    console.log('Success data fetching');
  },
};

const Home: NextPage = () => {
  const { currency, setLoading } = CryptoState();

  const { data, isLoading, isFetching } = useQuery<Coin[]>(
    ['coins', currency],
    () => fetchCoins(currency),
    configRQ
  );
  console.log(isLoading, isFetching);
  // console.log(data);

  useEffect(() => {
    // setLoading(isLoading);
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <>
      <Banner />
      <CoinsTable coins={data as Coin[]} />
    </>
  );
};

export default Home;

const fetchCoinsServerSide = async () => {
  try {
    const { data } = await axios.get(CoinList('USD'));

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getServerSideProps: GetServerSideProps = async () => {
  const currency = 'USD';
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['coins', currency], () =>
    fetchCoins(currency)
  );

  const _dehydrate = dehydrate(queryClient);
  // console.log(_dehydrate.queries[0].state);

  return {
    props: {
      dehydrateState: _dehydrate,
    },
  };
};
