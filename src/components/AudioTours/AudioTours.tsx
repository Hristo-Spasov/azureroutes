import style from "./AudioTours.module.scss";
import useScriptLoader from "../../hooks/useScriptLoader";
import { useRef } from "react";

const AudioTours = () => {
  const audioToursRef = useRef<HTMLDivElement>(null);

  const url = `https://c150.travelpayouts.com/content?promo_id=4489&powered_by=false&tours=4&city_id=${
    Math.floor(Math.random() * 15) + 1
  }&locale=en&shmarker=546163&trs=320952`;
  useScriptLoader(url, audioToursRef);

  return (
    <div className={style.audio_tours_container}>
      <h2>Set the Mood for Your Journey</h2>
      <p>Enhance your travel experience with immersive audio tours</p>
      <p>Get ready for your destination like never before</p>
      <div className={style.ref} ref={audioToursRef}></div>
    </div>
  );
};

export default AudioTours;
