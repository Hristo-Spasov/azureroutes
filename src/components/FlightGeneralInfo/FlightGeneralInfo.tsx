import style from "./FlightGeneralInfo.module.scss";
import FlightsListDetailedData from "../FlightsListDetailedData/FlightsListDetailedData";
import { useContext } from "react";
import { FetchContext } from "../../context/search-context";

interface DataType {
  icao: string;
  iata: string;
  name: string;
  operator: string;
  country: string;
}

const data: DataType[] = [
  {
    icao: "EGGS",
    iata: "STN",
    name: "London Stansted",
    operator: "Rayanair",
    country: "GB",
  },
  {
    icao: "EGGS",
    iata: "STN",
    name: "London Stansted",
    operator: "Rayanair",
    country: "GB",
  },
  {
    icao: "EGGS",
    iata: "STN",
    name: "London Stansted",
    operator: "Rayanair",
    country: "GB",
  },
];

const FlightGeneralInfo = (): JSX.Element => {
  const { departure, arrival } = useContext(FetchContext);
  return (
    <ul className={style.container}>
      {arrival?.data.map((el: any, index: number) => (
        <FlightsListDetailedData key={index} {...el} />
      ))}
    </ul>
  );
};

export default FlightGeneralInfo;
