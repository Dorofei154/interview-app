import { makeAutoObservable, flow } from "mobx";
import { getCryptoCurrencyList } from "../api/cryprtoCurrencyRequests";
import { TIMING_CONSTANTS } from "../constants/timeout";
import { ERRORS } from "../constants/error";

class CryptoStore {
  cryptoCurrencyList: [string, any][] = [];
  cryptoCurrencyListFiltered: [string, any][] = [];
  filterQuery: string = "";
  isLoading: boolean = false;
  sortKey: string = "";
  error: string | null = null;
  private intervalId: NodeJS.Timeout | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getCryptoById(id: string): [string, any] | undefined {
    return this.cryptoCurrencyList.find(([key]) => key === id);
  }

  setSortKey(key: string) {
    this.sortKey = key;
  }

  setFilterQuery(query: string): void {
    this.filterQuery = query;
  }
  setCurrency(items: [string, any][]): void {
    this.cryptoCurrencyListFiltered = items;
  }

  fetchCryptoCurrencyList = flow(function* (this: CryptoStore) {
    if (this.isLoading) return;

    this.isLoading = !this.isPolling;
    this.error = null;

    try {
      const response = yield getCryptoCurrencyList();
      const rawCryptoData = Object.entries(response);
      if (!this.cryptoCurrencyListFiltered.length) {
        this.cryptoCurrencyListFiltered = rawCryptoData;
      }
      this.cryptoCurrencyList = rawCryptoData;
    } catch (error: any) {
      console.error("Error during currency fetching:", error);
      this.error = error.message || ERRORS.UNEXPECTED;
    } finally {
      this.isLoading = false;
    }
  });

  startPolling(interval: number = TIMING_CONSTANTS.POLLING) {
    if (this.intervalId) return;

    this.fetchCryptoCurrencyList();
    this.intervalId = setInterval(() => {
      this.fetchCryptoCurrencyList();
    }, interval);
  }

  stopPolling() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  get isPolling() {
    return this.intervalId !== null;
  }
}

const cryptoStore = new CryptoStore();
export default cryptoStore;
