import { FlightDataType } from "../types/flight_types";
import { AirportType, WeatherType } from "../types/weather_types";
import fetchData from "./fetchData";

/// Flights fetching functions
interface ApiResponse<T> {
  data: T[];
}
export const API_KEY = import.meta.env.VITE_AVIATIONSTACK_KEY;

export const fetchArrivalData = async (searchAirportFormatted: string) => {
  console.log("fetching arr", searchAirportFormatted);
  const codeCheck =
    searchAirportFormatted.length === 3
      ? "arr_iata"
      : searchAirportFormatted.length === 4
      ? "arr_icao"
      : "";
  const data = await fetchData<ApiResponse<FlightDataType>>({
    url: `http://localhost:3000/api/v1/flights/arrivals?search=${searchAirportFormatted}&code=${codeCheck}`,
  });
  return data;
};

export const fetchDepartureData = async (searchAirportFormatted: string) => {
  console.log("fetching dep", searchAirportFormatted);
  const codeCheck =
    searchAirportFormatted.length === 3
      ? "dep_iata"
      : searchAirportFormatted.length === 4
      ? "dep_icao"
      : "";
  const data = await fetchData<ApiResponse<FlightDataType>>({
    url: `http://localhost:3000/api/v1/flights/departures?search=${searchAirportFormatted}&code=${codeCheck}`,
  });
  return data;
};

export const fetchFlightData = async (searchFlightFormatted: string) => {
  const data = await fetchData<ApiResponse<FlightDataType>>({
    url: `http://localhost:3000/api/v1/flights/flight?search=${searchFlightFormatted}`,
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

export const airportFetch = async (
  departureData: ApiResponse<FlightDataType>
) => {
  if (departureData && departureData.data.length !== 0) {
    const data = await fetchData<AirportType>({
      url: `https://aerodatabox.p.rapidapi.com/airports/iata/${departureData.data[0].departure.iata}`,
      options,
    });
    return data;
  }
};

export const weatherFetch = async (airport: AirportType) => {
  const data = await fetchData<WeatherType>({
    url: `https://api.weatherapi.com/v1/current.json?key=${
      import.meta.env.VITE_WEATHER_API
    }&q=${airport?.location.lat},${airport?.location.lon}`,
  });
  return data;
};
