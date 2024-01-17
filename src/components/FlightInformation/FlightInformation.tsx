import style from "./FlightInformation.module.scss";
import InFlight from "../../assets/airplane-in-flight-thin.svg?react";
import dayjs from "dayjs";
import { FlightDataType } from "../../types/flight_types";

const FlightInformation = (props: FlightDataType) => {
  const { arrival, departure, flight, flight_date, flight_status } = props;

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

  return (
    <>
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
        <div className={style.departure}>
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
        <div className={style.arrival}>
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
    </>
  );
};

export default FlightInformation;
