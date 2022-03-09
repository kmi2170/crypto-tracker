import type { NextPage } from 'next';
import AlertMessage from '../components/Alert';
import Banner from '../components/Banner/Banner';
import CoinsTable from '../components/CoinsTable';
import Footer from '../components/Footer';
// import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <>
      <Banner />
      <CoinsTable />
      <AlertMessage />
      <Footer />
    </>
  );
};

export default Home;
