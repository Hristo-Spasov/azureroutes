import style from "./WeatherWidget.module.scss";
import Temp from "../../assets/weather_icons/temp.svg?react";
import Humidity from "../../assets/weather_icons/humidity.svg?react";
import Wind from "../../assets/weather_icons/wind.svg?react";
import useWeather from "../../hooks/useWeather";

const WeatherWidget = () => {
  const { weather } = useWeather();

  if (!weather) return <></>;

  return (
    <div className={style.weather_container}>
      <img
        src={weather.current.condition.icon}
        alt="weather_icon"
        width={70}
        height={70}
      />
      <div className={style.meteo_metrics}>
        <div className={style.meteo_icons}>
          <Temp width={20} height={20} />
          <Wind width={20} height={20} />
          <Humidity width={20} height={20} />
        </div>
        <div className={style.metrics}>
          <span>{`${Math.floor(weather.current.temp_c)} C°`}</span>
          <span>{`${Math.floor(weather.current.wind_kph)} km/h`}</span>
          <span>{`${weather.current.humidity} %`}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;