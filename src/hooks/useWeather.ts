import { useState, useContext } from "react";
import { AirportType, WeatherType } from "../types/weather_types";
import { FetchContext } from "../context/fetch-context";
import { useQuery } from "react-query";
import { airportFetch, weatherFetch } from "../utils/fetchHelpers";
import toast from "react-hot-toast";

/**
 * A custom hook for fetching airport and weather data based on the departure information.
 *
 * @returns {Object} An object containing weather data, loading state, and error state.
 * @property {WeatherType} weather - The fetched weather data.
 * @property {boolean} weatherIsLoading - A boolean indicating whether weather data is currently being fetched.
 * @property {boolean} weatherIsError - A boolean indicating whether an error occurred while fetching weather data.
 *
 * @example
 * // Usage example:
 * const { weather, weatherIsLoading, weatherIsError } = useWeather();
 * // ...
 * if (weatherIsLoading) {
 *   return <p>Loading weather data...</p>;
 * }
 * if (weatherIsError) {
 *   return <p>Error fetching weather data</p>;
 * }
 * // Render weather data
 * return (
 *   <div>
 *     <h1>Weather Information</h1>
 *     <p>{weather?.temperature}°C</p>
 *     //{  Render other weather information }
 *    <div> )
 */

const useWeather = () => {
  const { departureData } = useContext(FetchContext);
  const [airport, setAirport] = useState<AirportType>();
  const [weather, setWeather] = useState<WeatherType>();

  const { isError: airportDataError } = useQuery({
    queryKey: ["airportData", departureData],
    queryFn: () => airportFetch(departureData!),
    enabled: !!departureData,
    onError: (error: Error) =>
      toast.error(`Something went wrong: ${error.message}`),
    cacheTime: 0,
    onSuccess: (data) => {
      setAirport(data);
    },
  });

  if (airportDataError) {
    console.error("Error fetching airport data", airportDataError);
  }

  const { isLoading: weatherIsLoading, isError: weatherIsError } = useQuery({
    queryKey: ["weatherData", airport],
    queryFn: () => weatherFetch(airport!),
    cacheTime: 0,
    enabled: !!airport,
    onError: (error: Error) =>
      toast.error(`Something went wrong: ${error.message}`),
    onSuccess: (data) => {
      setWeather(data);
    },
  });

  if (weatherIsError) {
    console.error("Error fetching weather data", weatherIsError);
  }

  return {
    weather,
    weatherIsLoading,
    weatherIsError,
  };
};

export default useWeather;
