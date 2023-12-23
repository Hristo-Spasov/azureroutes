import style from "./FlightList.module.scss";
import FlightGeneralInfo from "../FlightGeneralInfo/FlightGeneralInfo";
import { useContext, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { FetchContext } from "../../context/search-context";
import Temp from "../../assets/weather_icons/temp.svg?react";
import Wind from "../../assets/weather_icons/wind.svg?react";
import Humidity from "../../assets/weather_icons/humidity.svg?react";

interface LocationType {
  lat: number;
  lon: number;
}

interface AirportType {
  icao: string;
  iata: string;
  location: LocationType;
}

type WeatherType = {
  current: CurrentType;
};

interface CurrentType {
  last_updated: string;
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  feelslike_f: number;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  humidity: number;
  cloud: number;
  condition: ConditionType;
}

interface ConditionType {
  text: string;
  icon: string;
  code: number;
}

const FlightList = () => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [airport, setAirport] = useState<AirportType>();
  const [weather, setWeather] = useState<WeatherType>();

  const { arrival, departure } = useContext(FetchContext);

  // Local date & clock
  useEffect(() => {
    const intervalID = setInterval(() => {
      setDate(dayjs());
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API,
      "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
    },
  };

  useEffect(() => {
    const airportFetch = async () => {
      if (departure) {
        try {
          const airportResponse = await fetch(
            `https://aerodatabox.p.rapidapi.com/airports/iata/${departure.data[0].departure.iata}`,
            options
          );
          const airportData = await airportResponse.json();
          setAirport(airportData);
        } catch (error) {
          console.log((error as Error).message);
        }
      }
    };
    airportFetch();
  }, [departure]);

  useEffect(() => {
    const weatherFetch = async () => {
      if (airport && !weather) {
        try {
          const weatherResponse = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=${
              import.meta.env.VITE_WEATHER_API
            }&q=${airport?.location.lat},${airport?.location.lon}`
          );

          const weatherData = await weatherResponse.json();
          setWeather(weatherData);
        } catch (error) {
          console.log((error as Error).message);
        }
      }
    };
    weatherFetch();
  }, [airport]);

  useEffect(() => {
    if (weather) {
      console.log(weather);
    }
  }, [weather]);

  return (
    <>
      {arrival && departure && (
        <section className={style.flight_list_container}>
          {/* Meteo info about the Airport */}
          <div className={style.list_header}>
            <div className={style.weather_widged}>
              <div>
                <span>{date && date.format(`DD.MM.YYYY HH:mm:ss`)}</span>
              </div>
              {weather && (
                <div className={style.weather_container}>
                  <img
                    src={weather.current.condition.icon}
                    alt="weather_icon"
                    width={70}
                    height={70}
                  />
                  <div className={style.meteo_metrics}>
                    <div className={style.meteo_icons}>
                      <Temp width={20} height={20} />
                      <Wind width={20} height={20} />
                      <Humidity width={20} height={20} />
                    </div>
                    <div className={style.metrics}>
                      <span>{`${Math.floor(weather.current.temp_c)} C°`}</span>
                      <span>
                        {`${Math.floor(weather.current.wind_kph)} km/h`}
                      </span>
                      <span>{`${weather.current.humidity} %`}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Main List of Flights */}
          <div className={style.main_list_of_flights}>
            <FlightGeneralInfo />
          </div>
        </section>
      )}
    </>
  );
};

export default FlightList;
