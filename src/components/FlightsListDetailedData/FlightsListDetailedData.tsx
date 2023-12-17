import style from "./FlightsListDetailedData.module.scss";
import { useState } from "react";
import DownArrow from "../../assets/down-arrow-svgrepo-com.svg?react";
import InFlight from "../../assets/airplane-in-flight-thin.svg?react";

interface ArrivalType {
  icao: string;
  iata: string;
  airport: string;
}

interface Airline {
  name: string;
  iata: string;
  icao: string;
}

type FlightProps = {
  departure: ArrivalType;
  airline: Airline;
};

const FlightsListDetailedData = (el: FlightProps) => {
  const [toggle, setToggle] = useState<boolean>(false);

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
            <span>Date | Timezone</span>
            <div className={style.flight_number}>
              <span>Flight</span>
              <span>W9432</span>
            </div>
            <span>Status</span>
          </div>

          <span>Plovdiv,PDV</span>
          <div className={style.dropdown_departure}>
            <div className={style.departure_sub_class}>
              <span>scheduled</span>
              <span>2023/12/12 | 13:00 </span>
            </div>
            <div className={style.departure_sub_class}>
              <span>delay</span>
              <span>60 min</span>
            </div>
            <div className={style.departure_sub_class}>
              <span>estimated</span>
              <span>2023/12/12 | 14:00 </span>
            </div>
            <div className={style.departure_sub_class}>
              <span>actual</span>
              <span>2023/12/12 | 14:00 </span>
            </div>
          </div>

          <InFlight width={50} height={50} />

          <span>Sofia,SOF</span>
          <div className={style.dropdown_arrival}>
            <div className={style.arrival_sub_class}>
              <span>scheduled</span>
              <span>2023/12/12 | 13:00 </span>
            </div>
            <div className={style.arrival_sub_class}>
              <span>delay</span>
              <span>60 min</span>
            </div>
            <div className={style.arrival_sub_class}>
              <span>estimated</span>
              <span>2023/12/12 | 13:00 </span>
            </div>
            <div className={style.arrival_sub_class}>
              <span>actual</span>
              <span>2023/12/12 | 14:00 </span>
            </div>
          </div>
        </li>
      )}
    </>
  );
};

export default FlightsListDetailedData;
