export const getCurrencySymbol = (currency: string) => {
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
