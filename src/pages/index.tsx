import type { NextPage } from 'next';
import Banner from '../components/Banner/Banner';
import CoinsTable from '../components/CoinsTable';

const Home: NextPage = () => {
  return (
    <>
      <Banner />
      <CoinsTable />
    </>
  );
};

export default Home;
