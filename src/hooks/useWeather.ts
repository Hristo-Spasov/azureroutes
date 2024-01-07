import { useState, useContext } from "react";
import { AirportType, WeatherType } from "../types/weather_types";
import { FetchContext } from "../context/fetch-context";
import { useQuery } from "react-query";
import { airportFetch, weatherFetch } from "../utils/fetchHelpers";

const useWeather = () => {
  const { departureData } = useContext(FetchContext);
  const [airport, setAirport] = useState<AirportType>();
  const [weather, setWeather] = useState<WeatherType>();

  const { isError: airportDataError } = useQuery({
    queryKey: ["airportData", departureData],
    queryFn: () => airportFetch(departureData!),
    enabled: !!departureData,
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
