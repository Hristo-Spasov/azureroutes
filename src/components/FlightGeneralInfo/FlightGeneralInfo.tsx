import style from "./FlightGeneralInfo.module.scss";
import FlightsListDetailedData from "../FlightsListDetailedData/FlightsListDetailedData";

interface ElType {
  icao: string;
  iata: string;
  name: string;
  operator: string;
  country: string;
}

const data: ElType[] = [
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
  return (
    <ul className={style.container}>
      {data.map((el, index) => (
        <FlightsListDetailedData key={index} {...el} />
      ))}
    </ul>
  );
};

export default FlightGeneralInfo;
