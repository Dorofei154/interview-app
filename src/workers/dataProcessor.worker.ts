import { CURRENCY } from "../constants/currency";
import { SORT_KEYS } from "../constants/sortKeys";
import { CurrencyData } from "./CurrencyData.type";
import { SortKey } from "./SortKey.type";

onmessage = <T>(
  event: MessageEvent<{
    data: CurrencyData<T>[];
    filterQuery?: string;
    sortKey?: SortKey;
  }>
) => {
  const { data, filterQuery, sortKey } = event.data;

  if (!data) {
    postMessage([] as CurrencyData<T>[]);
    return;
  }

  let result: CurrencyData<T>[] = data;

  if (filterQuery) {
    result = result.filter(([key]) =>
      key.toLowerCase().includes(filterQuery.toLowerCase())
    );
  }

  if (sortKey) {
    result = result.sort(([keyA, valueA], [keyB, valueB]) => {
      if (sortKey === SORT_KEYS.ASC || sortKey === SORT_KEYS.DESC) {
        return keyA.localeCompare(keyB) * (sortKey === SORT_KEYS.ASC ? 1 : -1);
      }

      const valueAKey = (valueA as any)[CURRENCY.USD]?.[sortKey] ?? 1;
      const valueBKey = (valueB as any)[CURRENCY.USD]?.[sortKey] ?? 1;

      return valueAKey < valueBKey ? -1 : valueAKey > valueBKey ? 1 : 0;
    });
  }

  postMessage(result);
};
