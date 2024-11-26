import Banner from "../components/Banner/Banner";
import CoinsTable from "../components/CoinsTable";
import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <Header />
      <Banner />
      <CoinsTable />
    </>
  );
};

export default Home;

// export const getServerSideProps: GetServerSideProps = async () => {
//   const currency = "USD";
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery(["coins", currency], () =>
//     fetchCoins(currency)
//   );

//   await queryClient.prefetchQuery(["trending", currency], () =>
//     fetchTrendCoins(currency)
//   );

//   const _dehydrate = dehydrate(queryClient);
//   console.log(_dehydrate?.queries?.[0]?.state);

//   return {
//     props: {
//       dehydrateState: _dehydrate || null,
//     },
//   };
// };
