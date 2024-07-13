import { AirportData } from "../types/airport_types";
import { WeatherType } from "../types/weather_types";
import fetchData from "./fetchData";

/// Flights fetching functions
interface ApiResponse {
  data: AirportData;
}

const apiKey = import.meta.env.VITE_SERVER_KEY;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const flightOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "api-key": apiKey,
  },
};
export const fetchArrivalData = async (searchAirportFormatted: string) => {
  // console.log("fetching arr", searchAirportFormatted);
  const codeCheck =
    searchAirportFormatted.length === 3
      ? "arr_iata"
      : searchAirportFormatted.length === 4
      ? "arr_icao"
      : "";
  const data = await fetchData<ApiResponse>({
    url: `${BASE_URL}/api/v1/flights/arrivals?search=${searchAirportFormatted}&code=${codeCheck}`,
    options: flightOptions,
  });
  return data;
};

export const fetchDepartureData = async (searchAirportFormatted: string) => {
  // console.log("fetching dep", searchAirportFormatted);
  const codeCheck =
    searchAirportFormatted.length === 3
      ? "dep_iata"
      : searchAirportFormatted.length === 4
      ? "dep_icao"
      : "";
  const data = await fetchData<ApiResponse>({
    url: `${BASE_URL}/api/v1/flights/departures?search=${searchAirportFormatted}&code=${codeCheck}`,
    options: flightOptions,
  });
  return data;
};

export const fetchFlightData = async (searchFlightFormatted: string) => {
  const data = await fetchData<ApiResponse>({
    url: `${BASE_URL}/api/v1/flights/flight?search=${searchFlightFormatted}`,
    options: flightOptions,
  });
  return data;
};

/// Weather fetching functions

// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API,
//     "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
//   },
// };

// export const airportFetch = async (
//   departureData: ApiResponse<FlightDataType>
// ) => {
//   if (departureData && departureData.data.length !== 0) {
//     const data = await fetchData<AirportType>({
//       url: `https://aerodatabox.p.rapidapi.com/airports/iata/${departureData.data[0].departure.iata}`,
//       options,
//     });
//     return data;
//   }
// };

export const weatherFetch = async (location: string) => {
  const data = await fetchData<WeatherType>({
    url: `${BASE_URL}/api/v1/weather/?location=${location}`,
    options: flightOptions,
  });

  if (import.meta.env.VITE_STATUS === "development") {
    console.log("weather data", data);
  }
  return data;
};
