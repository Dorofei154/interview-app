import { useEffect, useCallback, useMemo } from "react";
import { autorun } from "mobx";
import cryptoStore from "../../../store/CryptoStore";
import DataProcessorWorker from "../../../workers/dataProcessor.worker?worker";
import { SORT_KEYS } from "../../../constants/sortKeys";

const useDataProcessor = () => {
  useEffect(() => {
    const worker = new DataProcessorWorker();

    const disposer = autorun(() => {
      const payload = {
        data: cryptoStore.cryptoCurrencyList,
        filterQuery: cryptoStore.filterQuery,
        sortKey: cryptoStore.sortKey,
      };

      worker.postMessage(JSON.parse(JSON.stringify(payload)));
    });

    worker.onmessage = (event) => {
      cryptoStore.setCurrency(event.data);
    };

    return () => {
      worker.terminate();
      disposer();
    };
  }, []);

  const handleSortKeyChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      cryptoStore.setSortKey(e.target.value);
    },
    []
  );
  const handleFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      cryptoStore.setFilterQuery(e.target.value);
    },
    []
  );

  const sortOptions = useMemo(
    () => [
      { value: SORT_KEYS.ASC, label: "Name asc" },
      { value: SORT_KEYS.DESC, label: "Name desc" },
      { value: SORT_KEYS.RATE, label: "Rate" },
      { value: SORT_KEYS.ASK, label: "Ask" },
      { value: SORT_KEYS.BID, label: "Bid" },
      { value: SORT_KEYS.DIFF24H, label: "24h Change" },
    ],
    []
  );

  return {
    handleSortKeyChange,
    handleFilterChange,
    sortOptions,
  };
};

export default useDataProcessor;
