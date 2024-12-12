import { Currencies } from "../api/types";

export const getCurrencySymbol = (currency: Currencies) => {
  switch (currency) {
    case "usd":
      return "$";
    case "eur":
      return "€";
    case "jpy":
      return "¥";
    default:
      return "";
  }
};
