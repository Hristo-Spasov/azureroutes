import dayjs from "dayjs";
import InFlight from "../../assets/InFlight.svg?react";
import style from "./Dropdown.module.scss";
import { ArrDepType, FlightType } from "../../types/flight_types";

interface DropdownProps {
  arrival: ArrDepType;
  departure: ArrDepType;
  flight: FlightType;
  flight_date: string;
  flight_status: string;
}

const Dropdown = (props: DropdownProps) => {
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

  const statusCheck = (string: string) => {
    switch (string) {
      case "active":
        return style.flight_status_active;
      case "landed":
        return style.flight_status_landed;
      case "cancelled":
      case "incident":
      case "diverted":
        return style.flight_status_problem;
      default:
        return style.flight_status;
    }
  };

  return (
    <>
      <li className={` ${style.detailed_information}`}>
        <div className={style.status}>
          <span>
            {dayjs(flight_date).format(`DD.MM.YYYY`)} | {departure.timezone}
          </span>
          <div className={style.flight_number}>
            {flight.iata !== null && <span>Flight {flight.iata}</span>}
          </div>
          <span className={statusCheck(flight_status)}>{flight_status}</span>
        </div>
        <div className={style.svg_container}>
          {" "}
          <InFlight />
        </div>

        {/* Arrival from airport */}
        <div className={style.arr_dep_container}>
          <div className={style.dropdown_departure}>
            <div className={style.departure_sub_class}>
              <span>{departure.airport}</span>
              <span className={style.decoration_text}>{departure.iata}</span>
            </div>
            <div className={style.departure_sub_class}>
              <span>Scheduled</span>
              <span className={style.decoration_text}>
                {formatDepScheduled}
              </span>
            </div>
            {departure.delay == "" ? (
              <div className={style.departure_sub_class}>
                <span>Delay</span>
                <span className={style.delay_text}>{departure.delay}</span>
              </div>
            ) : (
              ""
            )}

            <div className={style.departure_sub_class}>
              <span>Estimated</span>
              <span className={style.decoration_text}>
                {formatDepEstimated}
              </span>
            </div>
            <div className={style.departure_sub_class}>
              <span>Actual</span>
              <span
                className={
                  formatDepActual !== dateError
                    ? style.decoration_text
                    : style.delay_text
                }
              >
                {formatDepActual}
              </span>
            </div>
          </div>

          {/* Departure for airport */}
          <div className={style.dropdown_arrival}>
            <div className={style.arrival_sub_class}>
              <span>{arrival.airport}</span>
              <span className={style.decoration_text}>{arrival.iata}</span>
            </div>
            <div className={style.arrival_sub_class}>
              <span>Scheduled</span>
              <span className={style.decoration_text}>
                {formatArrScheduled}
              </span>
            </div>
            {arrival.delay == "" ? (
              <div className={style.arrival_sub_class}>
                <span className={style.delay_text}>Delay</span>
                <span>{arrival.delay}</span>
              </div>
            ) : (
              ""
            )}

            <div className={style.arrival_sub_class}>
              <span>Estimated</span>
              <span className={style.decoration_text}>
                {formatArrEstimated}
              </span>
            </div>
            <div className={style.arrival_sub_class}>
              <span>Actual</span>
              <span
                className={
                  formatArrActual !== dateError
                    ? style.decoration_text
                    : style.delay_text
                }
              >
                {formatArrActual}
              </span>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default Dropdown;
