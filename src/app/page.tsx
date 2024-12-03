import TrendCoins from "../components/TrendCoins";
import CoinsTable from "../components/CoinsTable";

const Home = () => {
  return (
    <>
      <TrendCoins />
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
