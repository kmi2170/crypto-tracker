import Image from "next/image";

import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { Currencies, TrendCoin } from "../../api/types";
import { formatNumber } from "../../lib/formatNumber";
import { getCurrencySymbol } from "../../lib/getCurrencySymbol";

type CarouselItemProps = {
  coin: TrendCoin;
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
  const { name, symbol, small: imgUrl } = coin;
  const { price, price_change_percentage_24h } = coin?.data;
  const isPriceUp = price_change_percentage_24h?.[currency] >= 0;

  return (
    <ItemWrapper>
      <Typography
        variant="subtitle1"
        align="center"
        sx={{ color: "dodgerblue", fontWeight: "bold" }}
      >
        {symbol}
      </Typography>
      <Image src={imgUrl} alt={name} width="30" height="30" />
      <Typography
        variant="subtitle1"
        align="center"
        sx={{ color: "black", fontWeight: "bold" }}
      >
        {getCurrencySymbol(currency)}
        {formatNumber(price, 3)}
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
        {price_change_percentage_24h?.[currency]?.toFixed(2)}%
      </Typography>
    </ItemWrapper>
  );
};

export default CarouselItem;
