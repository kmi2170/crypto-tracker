import Container from "@mui/material/Container";

import TrendCoins from "../components/TrendCoins";
import CoinsTable from "../components/CoinTable";
import SearchBar from "../components/SearchBar";
import { Suspense } from "react";

const Home = () => {
  return (
    <Container maxWidth="lg">
      <TrendCoins />
      <SearchBar />
      <Suspense>
        <CoinsTable />
      </Suspense>
    </Container>
  );
};

export default Home;
