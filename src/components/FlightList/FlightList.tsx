import { useContext, useEffect } from "react";
import FlightGeneralInfo from "../FlightGeneralInfo/FlightGeneralInfo";
import { FetchContext } from "../../context/fetch-context";
import { ClockContext } from "../../context/clock-context";
import style from "./FlightList.module.scss";
import useWeather from "../../hooks/useWeather";
import Spinner from "../Spinner/Spinner";
import WeatherWidget from "../WeatherWidget/WeatherWidget";
import { FlightFetchContext } from "../../context/flight-context";

interface FlightListProps {
  searchOption: string;
  flightChecked: string;
  airportChecked: string;
}

const FlightList = ({
  searchOption,
  flightChecked,
  airportChecked,
}: FlightListProps) => {
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
  const weatherIsAvailable = (departureData?.data.length || 0) > 0;

  const arrivalIsNotAvailable = arrivalActive && arrivalData?.data.length === 0;

  const departureIsNotAvailable =
    departureActive && departureData?.data.length === 0;

  const flightDataIsNotAvailable = flightData?.data.length === 0;

  const flightSearchButtonCondition = searchOption === flightChecked;

  const airportSearchButtonCondition =
    ((arrivalData !== undefined && arrivalActive) ||
      (departureData !== undefined && departureActive)) &&
    searchOption === airportChecked;

  return (
    <>
      {arrivalDataLoading || departureDataLoading || flightDataLoading ? (
        <Spinner />
      ) : (
        <>
          <section
            className={`${style.cards_container} ${
              airportSearchButtonCondition ? style.airport_active : ""
            }`}
          >
            {airportSearchButtonCondition && (
              <article className={style.flight_list_container}>
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
              </article>
            )}
            {/* Main List of Flights */}

            <article className={style.main_list_of_flights}>
              <FlightGeneralInfo
                flightSearchButtonCondition={flightSearchButtonCondition}
                airportSearchButtonCondition={airportSearchButtonCondition}
              />
            </article>
          </section>
          {/* Render massege when no aiport data can be found */}
          {(arrivalIsNotAvailable || departureIsNotAvailable) &&
            searchOption === airportChecked && (
              <div className={style.error}>
                <h3>
                  There is no such airport or the data about the airport is not
                  currently available
                </h3>
              </div>
            )}

          {/* Render massege when no flight data can be found  */}
          {flightDataIsNotAvailable && searchOption === flightChecked && (
            <div className={style.error}>
              <h3>
                There is no such flight number or the data about the flight is
                not currently available
              </h3>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default FlightList;
