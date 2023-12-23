import { useState, useEffect, useContext } from "react";
import { AirportType, WeatherType } from "../types/weather_types";
import { FetchContext } from "../context/search-context";

const useWeather = () => {
  const { departure } = useContext(FetchContext);
  const [airport, setAirport] = useState<AirportType>();
  const [weather, setWeather] = useState<WeatherType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API,
      "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
    },
  };
  // Airport location fetching
  useEffect(() => {
    const airportFetch = async () => {
      if (departure) {
        try {
          const airportResponse = await fetch(
            `https://aerodatabox.p.rapidapi.com/airports/iata/${departure.data[0].departure.iata}`,
            options
          );

          if (!airportResponse.ok) {
            throw new Error(
              `Airport data fetch failed with status ${airportResponse.status}`
            );
          }
          const airportData = await airportResponse.json();
          setAirport(airportData);
        } catch (error) {
          setError(error as Error);
        } finally {
          setLoading(false);
        }
      }
    };
    airportFetch();
  }, [departure]);

  //   Weather Fetching
  useEffect(() => {
    const weatherFetch = async () => {
      if (airport && !weather) {
        try {
          const weatherResponse = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=${
              import.meta.env.VITE_WEATHER_API
            }&q=${airport?.location.lat},${airport?.location.lon}`
          );

          if (!weatherResponse.ok) {
            throw new Error(
              `Weather data fetch failed with status ${weatherResponse.status}`
            );
          }

          const weatherData = await weatherResponse.json();
          setWeather(weatherData);
        } catch (error) {
          setError(error as Error);
        } finally {
          setLoading(false);
        }
      }
    };
    weatherFetch();
  }, [airport]);

  return { weather, loading, error };
};

export default useWeather;
