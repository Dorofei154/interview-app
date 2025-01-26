import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { TIMING_CONSTANTS } from "../constants/timeout";

class ApiService {
  client: AxiosInstance;
  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: TIMING_CONSTANTS.REQUEST_TIMEOUT_DURATION,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.client.interceptors.request.use(this.handleRequest, this.handleError);

    this.client.interceptors.response.use(
      this.handleResponse,
      this.handleError
    );
  }

  handleRequest(config: InternalAxiosRequestConfig) {
    return config;
  }

  handleResponse<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  handleError(error: Error) {
    console.error("Error: ", error);
    return Promise.reject(error);
  }

  get(url: string, params = {}) {
    return this.client.get(url, { params });
  }
}

const cryptoCurrencyService = new ApiService(import.meta.env.VITE_APP_API_URL);

export default cryptoCurrencyService;
