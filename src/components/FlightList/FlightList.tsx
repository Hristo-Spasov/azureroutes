import style from "./FlightList.module.scss";
import FlightGeneralInfo from "../FlightGeneralInfo/FlightGeneralInfo";
import { useEffect, useState } from "react";

const FlightList = () => {
  const [date, setDate] = useState<string>(new Date().toLocaleString());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setDate(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <>
      <section className={style.flight_list_container}>
        {/* Meteo info about the Airport */}
        <div className={style.list_header}>
          <div className={style.meteo_metrics}>
            <div>
              <span>{date}</span>
            </div>
            <div className={style.weather_metrics}>
              <span>IMG</span>
              <span>24C</span>
            </div>
          </div>
        </div>
        {/* Main List of Flights */}
        <div className={style.main_list_of_flights}>
          <FlightGeneralInfo />
        </div>
      </section>
    </>
  );
};

export default FlightList;
