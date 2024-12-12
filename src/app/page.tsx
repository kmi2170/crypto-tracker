import Container from "@mui/material/Container";

import TrendCoins from "../components/TrendCoins";
import CoinsTable from "../components/CoinTable";
import SearchBar from "../components/SearchBar";

const Home = () => {
  return (
    <Container maxWidth="lg">
      <TrendCoins />
      <SearchBar />
      <CoinsTable />
    </Container>
  );
};

export default Home;
