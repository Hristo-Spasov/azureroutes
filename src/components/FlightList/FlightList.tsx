import { useContext, useEffect } from "react";
import FlightGeneralInfo from "../FlightGeneralInfo/FlightGeneralInfo";
import { FetchContext } from "../../context/fetch-context";
import { ClockContext } from "../../context/clock-context";
import style from "./FlightList.module.scss";
import useWeather from "../../hooks/useWeather";
import Spinner from "../Spinner/Spinner";
import WeatherWidget from "../WeatherWidget/WeatherWidget";
import FlightInformation from "../FlightInformation/FlightInformation";
import { FlightFetchContext } from "../../context/flight-context";

const FlightList = () => {
  const { weather } = useWeather();
  const {
    arrivalData,
    departureData,
    arrivalActive,
    departureActive,
    arrivalDataLoading,
    departureDataLoading,
  } = useContext(FetchContext);
  const { date } = useContext(ClockContext);
  const { flightData, flightDataLoading } = useContext(FlightFetchContext);

  //TODO Remove in the Future
  useEffect(() => {
    if (weather) {
      console.log(weather);
    }
  }, [weather]);

  // Render Conditions
  const weatherIsAvailable = departureData?.data.length! > 0;
  const arrivalIsNotAvailable = arrivalData?.data.length === 0 && arrivalActive;
  const departuerIsNotAvailable =
    departureData?.data.length === 0 && departureActive;

  return (
    <>
      {arrivalDataLoading || departureDataLoading || flightDataLoading ? (
        <Spinner />
      ) : (
        <>
          {flightData &&
            flightData.data.map((items, index) => (
              <FlightInformation key={index} {...items} />
            ))}
          {arrivalData && departureData && (
            <section className={style.flight_list_container}>
              {/* Meteo info about the Airport */}
              <div className={style.list_header}>
                <div className={style.weather_widged}>
                  <div>
                    <span>{date && date.format(`DD.MM.YYYY HH:mm:ss`)}</span>
                  </div>
                  {/* Weather Widget */}
                  {weather && weatherIsAvailable && <WeatherWidget />}
                </div>
              </div>
              {/* Main List of Flights */}
              <div className={style.main_list_of_flights}>
                <FlightGeneralInfo />
              </div>
            </section>
          )}
          {arrivalIsNotAvailable || departuerIsNotAvailable ? (
            <h2>
              There is no such airport or the data about the airport is not
              currently available
            </h2>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

export default FlightList;
