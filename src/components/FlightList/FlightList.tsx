import style from "./FlightList.module.scss";
import FlightGeneralInfo from "../FlightGeneralInfo/FlightGeneralInfo";
import { useContext, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { FetchContext } from "../../context/search-context";

interface LocationType {
  lat: number;
  lon: number;
}

interface AirportType {
  icao: string;
  iata: string;
  location: LocationType;
}

const FlightList = () => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [airport, setAirport] = useState<AirportType>();

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

  const weatherFetch = async () => {
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
  useEffect(() => {
    weatherFetch();
  }, [departure]);

  useEffect(() => {
    if (airport) {
      console.log(airport.location.lat);
      console.log(airport.location.lon);
    }
  }, [airport]);

  return (
    <>
      {arrival && departure && (
        <section className={style.flight_list_container}>
          {/* Meteo info about the Airport */}
          <div className={style.list_header}>
            <div className={style.meteo_metrics}>
              <div>
                <span>{date && date.format(`DD.MM.YYYY HH:mm:ss`)}</span>
              </div>
              <div className={style.weather_metrics}>
                <span>IMG</span>
                <span>24C</span>
              </div>
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
