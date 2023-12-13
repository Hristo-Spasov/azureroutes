import style from "./FlightsListDetailedData.module.scss";
import { useState } from "react";
import DownArrow from "../../assets/down-arrow-svgrepo-com.svg?react";

type FlightProps = {
  icao: string;
  iata: string;
  name: string;
  operator: string;
  country: string;
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
          <span>icao: {el.icao}</span>
          <span>iata: {el.iata}</span>
        </div>
        <div>
          <span>
            name: {el.name} | {el.country}
          </span>
        </div>
        <div>
          <span>Operator: {el.operator}</span>
        </div>
        <span className={style.arrow_wrapper} onClick={toggleDropdown}>
          <DownArrow width={12} height={12} />
        </span>
      </li>
      {toggle && (
        <li className={style.detailed_information}>
          <div className={style.status}>
            <span>Date | Timezone</span>
            <span>Status</span>
          </div>
          <span>Departure</span>
          <span>delay</span>
          <div className={style.dropdown_departure}>
            <span>airport,iata</span>
            <span>scheduled</span>
            <span>estimated</span>
            <span>actual</span>
          </div>
          <span>Arrival</span>
          <span>delay</span>
          <div className={style.dropdown_arrival}>
            <span>airport,iata</span>
            <span>scheduled</span>
            <span>estimated</span>
            <span>actual</span>
          </div>
        </li>
      )}
    </>
  );
};

export default FlightsListDetailedData;
