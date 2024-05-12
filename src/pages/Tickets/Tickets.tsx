import { useRef } from "react";
import style from "./Tickets.module.scss";
import useScriptLoader from "../../hooks/useScriptLoader";
import Restrictions from "../../components/Restrictions/Restrictions";
import AudioTours from "../../components/AudioTours/AudioTours";

const Tickets = () => {
  const widgetContainerRef = useRef<HTMLDivElement>(null);
  const url =
    "https://tp.media/content?campaign_id=121&promo_id=4132&color_border=%231F3D6000&color_button_text=%23ffffff&color_button=%231F3D60&plain=true&border_radius=0&powered_by=false&default_origin=London&curr=EUR&locale=en&shmarker=546163&trs=320952";
  useScriptLoader(url, widgetContainerRef);

  return (
    <>
      <div className={style.header}>
        <h1>Where will your travel take you ?</h1>
        <p>Search for your next travel adventure.</p>
      </div>
      <div ref={widgetContainerRef}></div>
      <Restrictions />
      <AudioTours />
    </>
  );
};

export default Tickets;
