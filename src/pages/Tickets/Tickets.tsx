import style from "./Tickets.module.scss";
import { Helmet } from "react-helmet";

const Tickets = () => {
  return (
    <div className={style.container}>
      <Helmet>
        <script
          async
          src="https://tp.media/content?campaign_id=121&promo_id=4132&color_border=%232681ff&color_button_text=%23ffffff&color_button=%232681ff&plain=true&border_radius=0&powered_by=true&default_origin=London&curr=EUR&locale=en&shmarker=546163&trs=320952"
          charSet="utf-8"
        ></script>
        <script
          async
          src="https://tp.media/content?campaign_id=200&promo_id=7293&secondary=%23F1EDFC&light=%23FFFFFF&dark=%230C131D&primary=%230C131D&powered_by=true&Checkbox_9=false&locale=en_us&shmarker=546163&trs=320952"
          charSet="utf-8"
        ></script>
      </Helmet>
    </div>
  );
};

export default Tickets;
