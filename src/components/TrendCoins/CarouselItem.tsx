import Image from "next/image";

import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { Coin, Currencies } from "../../context/types";
import { formatNumber } from "../../lib/formatNumber";
import { getCurrencySymbol } from "../../lib/getCurrencySymbol";

type CarouselItemProps = {
  coin: Coin;
  currency: Currencies;
};

const ItemWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  textTransform: "uppercase",
  color: "white",
  transition: "background-color 0.5s ease",
  "&:hover": {
    backgroundColor: "rgba(192,192,192,0.5)",
    borderRadius: "5px",
  },
});

const CarouselItem = ({ coin, currency }: CarouselItemProps) => {
  const isPriceUp = coin?.price_change_percentage_24h >= 0;
  return (
    <ItemWrapper>
      <Typography
        variant="subtitle1"
        align="center"
        sx={{ color: "dodgerblue", fontWeight: "bold" }}
      >
        {coin?.symbol}
      </Typography>
      <Image src={coin?.image} alt={coin.name} width="30" height="30" />
      <Typography
        variant="subtitle1"
        align="center"
        sx={{ color: "black", fontWeight: "bold" }}
      >
        {getCurrencySymbol(currency)}
        {formatNumber(coin?.current_price, 3)}
      </Typography>
      <Typography
        variant="subtitle2"
        align="center"
        sx={{
          color: isPriceUp ? "rgb(14, 203, 129)" : "red",
          fontWeight: "bold",
        }}
      >
        {isPriceUp && "+"}
        {coin?.price_change_percentage_24h?.toFixed(2)}%
      </Typography>
    </ItemWrapper>
  );
};

export default CarouselItem;
