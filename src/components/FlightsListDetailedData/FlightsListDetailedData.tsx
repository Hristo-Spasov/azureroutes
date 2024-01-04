import style from "./FlightsListDetailedData.module.scss";
import DownArrow from "../../assets/down-arrow-svgrepo-com.svg?react";
import InFlight from "../../assets/airplane-in-flight-thin.svg?react";
import dayjs from "dayjs";
import { Airline, ArrDepType, FlightType } from "../../types/flight_types";
import { useContext, useEffect, useState } from "react";
import { FetchContext } from "../../context/fetch-context";

type FlightProps = {
  arrival: ArrDepType;
  departure: ArrDepType;
  airline: Airline;
  flight: FlightType;
  flight_date: string;
  flight_status: string;
};

interface FlightsListDetailedDataProps {
  el: FlightProps;
  selectedPage: number;
}

const FlightsListDetailedData = (props: FlightsListDetailedDataProps) => {
  const { arrival, departure, airline, flight, flight_date, flight_status } =
    props.el;
  const { selectedPage } = props;
  const [toggle, setToggle] = useState<boolean>(false);
  const { arrivalActive, departureActive, arrivalData, departureData } =
    useContext(FetchContext);

  const dateError = "No information available";

  const formatDepScheduled = departure.scheduled
    ? dayjs(departure.scheduled).format(`DD.MM.YYYY HH:mm:ss`)
    : dateError;
  const formatDepEstimated = departure.estimated
    ? dayjs(departure.estimated).format(`DD.MM.YYYY HH:mm:ss`)
    : dateError;
  const formatDepActual = departure.actual
    ? dayjs(departure.actual).format(`DD.MM.YYYY HH:mm:ss`)
    : dateError;

  const formatArrScheduled = arrival.scheduled
    ? dayjs(arrival.scheduled).format(`DD.MM.YYYY HH:mm:ss`)
    : dateError;
  const formatArrEstimated = arrival.estimated
    ? dayjs(arrival.estimated).format(`DD.MM.YYYY HH:mm:ss`)
    : dateError;
  const formatArrActual = arrival.actual
    ? dayjs(arrival.actual).format(`DD.MM.YYYY HH:mm:ss`)
    : dateError;

  const toggleDropdown = () => {
    setToggle((prev) => !prev);
  };

  useEffect(() => {
    setToggle(false);
  }, [
    arrivalActive,
    departureActive,
    arrivalData,
    departureData,
    selectedPage,
  ]);

  return (
    <>
      <li className={` ${style.information_wrapper} `} onClick={toggleDropdown}>
        <div className={style.codes}>
          <span>icao: {departure.icao}</span>
          <span>iata: {departure.iata}</span>
        </div>
        <div className={style.airport_operator_names}>
          <span>Airport: {departure.airport}</span>
        </div>
        <div className={style.airport_operator_names}>
          <span>Operator: {airline.name}</span>
        </div>
        <span className={style.arrow_wrapper}>
          <DownArrow width={12} height={12} />
        </span>
      </li>

      {/* Dropdown Information */}

      {toggle && (
        <li className={`${style.detailed_information}`}>
          <div className={style.status}>
            <span>
              {dayjs(flight_date).format(`DD.MM.YYYY`)} | {departure.timezone}
            </span>
            <div className={style.flight_number}>
              <span>Flight</span>
              <span>{flight.iata}</span>
            </div>
            <span>{flight_status}</span>
          </div>
          {/* Arrival from airport */}
          <div className={style.airport_name}>
            <span>
              {departure.airport},{departure.iata}
            </span>
          </div>
          <div className={style.dropdown_departure}>
            <div className={style.departure_sub_class}>
              <span>Scheduled</span>
              <span>{formatDepScheduled}</span>
            </div>
            {departure.delay == "" ? (
              <div className={style.departure_sub_class}>
                <span>Delay</span>
                <span>{departure.delay}</span>
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
          <div className={style.airport_name}>
            <span>
              {arrival.airport},{arrival.iata}
            </span>
          </div>
          <div className={style.dropdown_arrival}>
            <div className={style.arrival_sub_class}>
              <span>Scheduled</span>
              <span>{formatArrScheduled}</span>
            </div>
            {arrival.delay == "" ? (
              <div className={style.arrival_sub_class}>
                <span>Delay</span>
                <span>{arrival.delay}</span>
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
