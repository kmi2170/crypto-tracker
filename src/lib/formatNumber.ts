export const formatNumber = (number: number, numOfDecimals: number = 1) => {
  if (number >= 1e9) {
    return (number / 1e9).toFixed(numOfDecimals) + "B";
  } else if (number >= 1e6) {
    return (number / 1e6).toFixed(numOfDecimals) + "M";
  } else if (number >= 1e3) {
    return (number / 1e3).toFixed(numOfDecimals) + "K";
  } else {
    return number.toString();
  }
};
