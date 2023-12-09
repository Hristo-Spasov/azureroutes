import style from "./FlightList.module.scss";

const FlightList = () => {
  return (
    <>
      <section className={style.flight_list_container}>
        {/* Meteo info about the Airport */}
        <div className={style.list_header}>
          <div className={style.meteo_metrics}>
            <div>
              <span>01.01.2024 | 12:00 </span>
            </div>
            <div className={style.weather_metrics}>
              <span>IMG</span>
              <span>24C</span>
            </div>
          </div>
        </div>
        {/* Main List of Flights */}
        <div>
          <ul>
            <li>London</li>
            <li>Berlin</li>
            <li>Paris</li>
            <li>Sofia</li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default FlightList;
