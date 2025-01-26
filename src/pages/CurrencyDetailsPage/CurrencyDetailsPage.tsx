import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import cryptoStore from "../../store/CryptoStore";
import { LoaderSpinner } from "../../shared";
import styles from "./CurrencyDetails.module.css";
import { CURRENCY } from "../../constants/currency";
import { CurrencyInfoCard, ErrorMessage } from "../../components";
import { useCryptocurrencyData } from "../../utils";

const CurrenctDetailsPage = observer(() => {
  const { id } = useParams<{ id: string }>();
  const cryptoData = cryptoStore.getCryptoById(id || "");

  useCryptocurrencyData();

  if (cryptoStore.isLoading) {
    return <LoaderSpinner />;
  }

  if (cryptoStore.error) {
    return <div>Error: {cryptoStore.error}</div>;
  }

  if (!cryptoData) {
    return <ErrorMessage message={`Cryptocurrency with ID ${id} not found.`} />;
  }

  const [currencyKey, currencyData] = cryptoData;
  const currencyDataList = [
    { label: "Rate", value: currencyData[CURRENCY.USD].rate },
    { label: "Ask", value: currencyData[CURRENCY.USD].ask },
    { label: "Bid", value: currencyData[CURRENCY.USD].bid },
    { label: "24h Change", value: currencyData[CURRENCY.USD].diff24h },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>{currencyKey?.toUpperCase()}</h1>
        <CurrencyInfoCard data={currencyDataList} />
      </div>
    </div>
  );
});

export default CurrenctDetailsPage;
