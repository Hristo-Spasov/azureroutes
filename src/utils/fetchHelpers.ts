import { ArrDepType } from "../types/flight_types";
import { AirportType, WeatherType } from "../types/weather_types";
import fetchData from "./fetchData";

/// Flights fetching functions
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

/// Weather fetching functions

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API,
    "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
  },
};

export const airportFetch = async (departureData: ApiResponse<ArrDepType>) => {
  if (departureData) {
    const data = await fetchData<AirportType>({
      url: `https://aerodatabox.p.rapidapi.com/airports/iata/${departureData.data[0].departure.iata}`,
      options,
    });
    return data;
  }
};

export const weatherFetch = async (airport: AirportType) => {
  const data = await fetchData<WeatherType>({
    url: `http://api.weatherapi.com/v1/current.json?key=${
      import.meta.env.VITE_WEATHER_API
    }&q=${airport?.location.lat},${airport?.location.lon}`,
  });
  return data;
};
