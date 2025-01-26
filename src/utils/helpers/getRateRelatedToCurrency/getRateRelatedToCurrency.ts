import { CURRENCY } from "../../../constants/currency";

const getRateRelatedToCurrency = <
  T extends Record<string, { rate: number }>
>(
  item: T,
  currency: keyof T = CURRENCY.USD
): string => {
  return `$ ${String(currency).toUpperCase()} - ${item[currency]?.rate ?? 1}`;
};

export default getRateRelatedToCurrency;