import { useState, useContext, useEffect } from "react";
import { WeatherType } from "../types/weather_types";
import { FetchContext } from "../context/fetch-context";
import { useQuery } from "@tanstack/react-query";
import { weatherFetch } from "../utils/fetchHelpers";
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
  const [weather, setWeather] = useState<WeatherType>();
  const { suggestion, departureData } = useContext(FetchContext);
  const [location, setLocation] = useState(suggestion?.location || "");

  useEffect(() => {
    setLocation(suggestion?.location || "");
  }, [suggestion?.location]);

  const {
    data: cachedWeather,
    isFetching: weatherIsLoading,
    isError: weatherIsError,
    error: weatherError,
  } = useQuery({
    queryKey: ["weatherData", departureData],
    queryFn: () => weatherFetch(location),
    enabled: !!departureData && !!location && !weather,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (cachedWeather) {
      setWeather(cachedWeather);
    }
  }, [cachedWeather]);

  useEffect(() => {
    if (weatherError instanceof Error) {
      toast.error(`Something went wrong: ${weatherError.message}`);
    }
  }, [weatherError]);

  useEffect(() => {
    if (weatherIsError) {
      console.error("Error fetching weather data", weatherIsError);
    }
  }, [weatherIsError]);

  return {
    weather,
    weatherIsLoading,
    weatherIsError,
  };
};

export default useWeather;
