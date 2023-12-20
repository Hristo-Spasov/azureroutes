import style from "./FlightGeneralInfo.module.scss";
import FlightsListDetailedData from "../FlightsListDetailedData/FlightsListDetailedData";
import { useContext } from "react";
import { FetchContext } from "../../context/search-context";

const FlightGeneralInfo = (): JSX.Element => {
  const { departure, arrival, arrivalActive, departureActive } =
    useContext(FetchContext);
  return (
    <ul className={style.container}>
      {arrivalActive && arrival
        ? arrival.data.map((el: any, index: number) => (
            <FlightsListDetailedData key={index} {...el} />
          ))
        : ""}

      {departureActive && departure
        ? departure.data.map((el: any, index: number) => (
            <FlightsListDetailedData key={index} {...el} />
          ))
        : ""}
    </ul>
  );
};

export default FlightGeneralInfo;
