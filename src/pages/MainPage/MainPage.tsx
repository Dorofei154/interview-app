import React from "react";
import cryptoStore from "../../store/CryptoStore";
import { observer } from "mobx-react-lite";
import { ERRORS } from "../../constants/error";
import { LoaderSpinner, VirtualizedList } from "../../shared";
import { ErrorMessage } from "../../components";
import { useCryptocurrencyData, useCryptoFilteredSorted } from "../../utils";
import CustomSelect from "../../shared/Select/Select";
import Input from "../../shared/Input/Input";
import styles from "./Main.module.css";

const MainPage: React.FC = observer(() => {
  useCryptocurrencyData();
  const { handleSortKeyChange, handleFilterChange, sortOptions } =
    useCryptoFilteredSorted();

  if (cryptoStore.isLoading) {
    return <LoaderSpinner />;
  }

  if (cryptoStore.error) {
    return <ErrorMessage message={cryptoStore.error ?? ERRORS.UNEXPECTED} />;
  }

  return (
    <>
      <div className={styles.wrapper}>
        <Input
          type="text"
          placeholder="Filter"
          value={cryptoStore.filterQuery}
          onChange={handleFilterChange}
        />
        <CustomSelect
          value={cryptoStore.sortKey}
          onChange={handleSortKeyChange}
          options={sortOptions}
        />
      </div>

      <VirtualizedList
        items={cryptoStore.cryptoCurrencyListFiltered}
        itemHeight={80}
      />
    </>
  );
});

export default MainPage;
