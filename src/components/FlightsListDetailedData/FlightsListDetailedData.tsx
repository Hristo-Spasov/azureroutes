import style from "./FlightsListDetailedData.module.scss";
import { useState } from "react";
import DownArrow from "../../assets/down-arrow-svgrepo-com.svg?react";
import InFlight from "../../assets/airplane-in-flight-thin.svg?react";

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

  const formatDepScheduled = new Date(el.departure.scheduled).toLocaleString();
  const formatDepEstimated = new Date(el.departure.estimated).toLocaleString();
  const formatDepActual = new Date(el.departure.actual).toLocaleString();

  const formatArrScheduled = new Date(el.arrival.scheduled).toLocaleString();
  const formatArrEstimated = new Date(el.arrival.estimated).toLocaleString();
  const formatArrActual = new Date(el.arrival.actual).toLocaleString();

  const toggleDropdown = () => {
    setToggle((prev) => !prev);
  };

  return (
    <>
      <li className={style.information_wrapper}>
        <div className={style.codes}>
          <span>icao: {el.departure.icao}</span>
          <span>iata: {el.departure.iata}</span>
        </div>
        <div>
          <span>name: {el.departure.airport}</span>
        </div>
        <div>
          <span>Operator: {el.airline.name}</span>
        </div>
        <span className={style.arrow_wrapper} onClick={toggleDropdown}>
          <DownArrow width={12} height={12} />
        </span>
      </li>

      {/* Dropdown Information */}

      {toggle && (
        <li className={style.detailed_information}>
          <div className={style.status}>
            <span>
              {el.flight_date} | {el.departure.timezone}
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
              <span>scheduled</span>
              <span>{formatArrScheduled}</span>
            </div>
            {el.arrival.delay == "" ? (
              <div className={style.arrival_sub_class}>
                <span>delay</span>
                <span>{el.arrival.delay}</span>
              </div>
            ) : (
              ""
            )}

            <div className={style.arrival_sub_class}>
              <span>estimated</span>
              <span>{formatArrEstimated}</span>
            </div>
            <div className={style.arrival_sub_class}>
              <span>actual</span>
              <span>{formatArrActual}</span>
            </div>
          </div>
        </li>
      )}
    </>
  );
};

export default FlightsListDetailedData;
