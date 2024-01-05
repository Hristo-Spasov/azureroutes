import style from "./FlightsListDetailedData.module.scss";
import DownArrow from "../../assets/down-arrow-svgrepo-com.svg?react";
import { Airline, ArrDepType, FlightType } from "../../types/flight_types";
import { useContext, useEffect, useState } from "react";
import { FetchContext } from "../../context/fetch-context";
import Dropdown from "../Dropdown/Dropdown";

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

  const toggleDropdown = () => {
    setToggle((prev) => !prev);
  };

  //Closing the dropdown on page change or section change
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
      <li className={style.information_wrapper} onClick={toggleDropdown}>
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
        <Dropdown
          arrival={arrival}
          departure={departure}
          flight_date={flight_date}
          flight_status={flight_status}
          flight={flight}
        />
      )}
    </>
  );
};

export default FlightsListDetailedData;
