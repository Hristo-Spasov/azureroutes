import style from "./FlightList.module.scss";
import FlightGeneralInfo from "../FlightGeneralInfo/FlightGeneralInfo";

const FlightList = () => {
  const date = new Date().toLocaleString();

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
