export const format = (
  usdPrice,
  targetCurrency = "USD"
) => {
  // Fixed exchange rates
  const exchangeRates = {
    USD: 1,
    EUR: 0.9,
    GBP: 0.8,
    JPY: 108.8,
  };

  const convertedValue = (usdPrice * exchangeRates[targetCurrency]).toFixed(2);
  const convertedFormattedValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: targetCurrency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parseFloat(convertedValue));

  return convertedFormattedValue;
};

export default format;