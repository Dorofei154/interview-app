import { useEffect } from "react";
import cryptoStore from "../../../store/CryptoStore";
import { TIMING_CONSTANTS } from "../../../constants/timeout";

const useCryptocurrencyData = () => {
  useEffect(() => {
    cryptoStore.startPolling(TIMING_CONSTANTS.POLLING);
    return () => {
      cryptoStore.stopPolling();
    };
  }, []);
};

export default useCryptocurrencyData;
