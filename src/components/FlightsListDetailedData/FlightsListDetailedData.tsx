import style from "./FlightsListDetailedData.module.scss";
import { useState } from "react";
import DownArrow from "../../assets/down-arrow-svgrepo-com.svg?react";
import InFlight from "../../assets/airplane-in-flight-thin.svg?react";
import dayjs from "dayjs";

interface ArrDepType {
  icao: string;
  iata: string;
  airport: string;
  timezone: string;
  scheduled: string;
  estimated: string;
  actual: string;
  delay: string;
}

interface Airline {
  name: string;
  iata: string;
  icao: string;
}

interface FlightType {
  number: string;
  iata: string;
  icao: string;
}

type FlightProps = {
  arrival: ArrDepType;
  departure: ArrDepType;
  airline: Airline;
  flight: FlightType;
  flight_date: string;
  flight_status: string;
};

const FlightsListDetailedData = (el: FlightProps) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const dateError = "No information available";

  const formatDepScheduled = el.departure.scheduled
    ? dayjs(el.departure.scheduled).format(`DD.MM.YYYY HH:mm:ss`)
    : dateError;
  const formatDepEstimated = el.departure.estimated
    ? dayjs(el.departure.estimated).format(`DD.MM.YYYY HH:mm:ss`)
    : dateError;
  const formatDepActual = el.departure.actual
    ? dayjs(el.departure.actual).format(`DD.MM.YYYY HH:mm:ss`)
    : dateError;

  const formatArrScheduled = el.arrival.scheduled
    ? dayjs(el.arrival.scheduled).format(`DD.MM.YYYY HH:mm:ss`)
    : dateError;
  const formatArrEstimated = el.arrival.estimated
    ? dayjs(el.arrival.estimated).format(`DD.MM.YYYY HH:mm:ss`)
    : dateError;
  const formatArrActual = el.arrival.actual
    ? dayjs(el.arrival.actual).format(`DD.MM.YYYY HH:mm:ss`)
    : dateError;

  const toggleDropdown = () => {
    setToggle((prev) => !prev);
  };

  return (
    <>
      <li className={style.information_wrapper} onClick={toggleDropdown}>
        <div className={style.codes}>
          <span>icao: {el.departure.icao}</span>
          <span>iata: {el.departure.iata}</span>
        </div>
        <div>
          <span>Airport: {el.departure.airport}</span>
        </div>
        <div>
          <span>Operator: {el.airline.name}</span>
        </div>
        <span className={style.arrow_wrapper}>
          <DownArrow width={12} height={12} />
        </span>
      </li>

      {/* Dropdown Information */}

      {toggle && (
        <li className={style.detailed_information}>
          <div className={style.status}>
            <span>
              {dayjs(el.flight_date).format(`DD.MM.YYYY`)} |{" "}
              {el.departure.timezone}
            </span>
            <div className={style.flight_number}>
              <span>Flight</span>
              <span>{el.flight.iata}</span>
            </div>
            <span>{el.flight_status}</span>
          </div>
          {/* Arrival from airport */}
          <span>
            {el.departure.airport},{el.departure.iata}
          </span>
          <div className={style.dropdown_departure}>
            <div className={style.departure_sub_class}>
              <span>Scheduled</span>
              <span>{formatDepScheduled}</span>
            </div>
            {el.departure.delay == "" ? (
              <div className={style.departure_sub_class}>
                <span>Delay</span>
                <span>{el.departure.delay}</span>
              </div>
            ) : (
              ""
            )}

            <div className={style.departure_sub_class}>
              <span>Estimated</span>
              <span>{formatDepEstimated}</span>
            </div>
            <div className={style.departure_sub_class}>
              <span>Actual</span>
              <span>{formatDepActual}</span>
            </div>
          </div>

          <InFlight width={50} height={50} />

          {/* Departure for airport */}
          <span>
            {el.arrival.airport},{el.arrival.iata}
          </span>
          <div className={style.dropdown_arrival}>
            <div className={style.arrival_sub_class}>
              <span>Scheduled</span>
              <span>{formatArrScheduled}</span>
            </div>
            {el.arrival.delay == "" ? (
              <div className={style.arrival_sub_class}>
                <span>Delay</span>
                <span>{el.arrival.delay}</span>
              </div>
            ) : (
              ""
            )}

            <div className={style.arrival_sub_class}>
              <span>Estimated</span>
              <span>{formatArrEstimated}</span>
            </div>
            <div className={style.arrival_sub_class}>
              <span>Actual</span>
              <span>{formatArrActual}</span>
            </div>
          </div>
        </li>
      )}
    </>
  );
};

export default FlightsListDetailedData;
