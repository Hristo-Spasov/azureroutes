import style from "./FlightsListDetailedData.module.scss";
import DownArrow from "../../assets/down-arrow-svgrepo-com.svg?react";
import { FlightDataType } from "../../types/flight_types";
import { useContext, useEffect, useState } from "react";
import { FetchContext } from "../../context/fetch-context";
import Dropdown from "../Dropdown/Dropdown";

interface FlightsListDetailedDataProps {
  el: FlightDataType;
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
    <div className={style.list_element_container}>
      <li
        className={`${style.information_wrapper} ${toggle ? style.active : ""}`}
        onClick={toggleDropdown}
      >
        <div className={style.codes_container}>
          <div className={style.inner_wrapper}>
            <span>ICAO</span>
            <span className={style.codes}>{departure.icao}</span>
          </div>
          <div className={style.inner_wrapper}>
            <span>IATA</span>
            <span className={style.codes}>{departure.iata}</span>
          </div>
        </div>
        <div className={style.airport_operator_container}>
          <span>Airport</span>
          <span className={style.airport_operator_names}>
            {departure.airport}
          </span>
        </div>
        <div className={style.airport_operator_container}>
          <span>Airline</span>
          <span className={style.airport_operator_names}>{airline.name}</span>
        </div>
        <span
          className={`${style.arrow_wrapper} ${
            toggle ? style.arrow_active : ""
          }`}
        >
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
    </div>
  );
};

export default FlightsListDetailedData;
