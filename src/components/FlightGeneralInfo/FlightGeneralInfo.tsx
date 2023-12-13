import style from "./FlightGeneralInfo.module.scss";

const data = [
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

const FlightGeneralInfo = () => {
  return (
    <>
      <ul className={style.container}>
        {data.map((el) => (
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
          </li>
        ))}
      </ul>
    </>
  );
};

export default FlightGeneralInfo;
