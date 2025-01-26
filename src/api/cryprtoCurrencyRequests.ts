import cryptoCurrencyService from "./axiosClient";

export const getCryptoCurrencyList = async (query?: string) => {
  try {
    const response = await cryptoCurrencyService.get(
      "rates/extended",
      {
        query,
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("error");
  }
};
