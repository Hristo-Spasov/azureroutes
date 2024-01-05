import { ArrDepType } from "../types/flight_types";
import fetchData from "./fetchData";

interface ApiResponse<T> {
  data: T[];
}
const BASE_URL = "http://api.aviationstack.com/v1/";
export const API_KEY = import.meta.env.VITE_AVIATIONSTACK_KEY;

export const fetchArrivalData = async (searchFormatted: string) => {
  const data = await fetchData<ApiResponse<ArrDepType>>({
    url: `${BASE_URL}flights?access_key=${API_KEY}&arr_iata=${searchFormatted}`,
  });
  return data;
};

export const fetchDepartureData = async (searchFormatted: string) => {
  const data = await fetchData<ApiResponse<ArrDepType>>({
    url: `${BASE_URL}flights?access_key=${API_KEY}&dep_iata=${searchFormatted}`,
  });
  return data;
};
