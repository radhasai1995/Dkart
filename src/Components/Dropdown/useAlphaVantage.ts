import useSWR from "swr";
import * as apiService from "../../apiServices";

const useAlphaVantage = (params: any) => {
  const seriesData = useSWR(["/query", params], () => {}, {
    refreshInterval: 20000,
  });

  return seriesData?.data;
};

export default useAlphaVantage;
