import { Helmet } from "react-helmet-async";
import style from "./Tickets.module.scss";

const Tickets = () => {
  return (
    <div className={style.container}>
      <Helmet>
        <script
          async
          src="https://tp.media/content?campaign_id=121&promo_id=4132&color_border=%232681ff&color_button_text=%23ffffff&color_button=%232681ff&plain=true&border_radius=0&powered_by=true&curr=EUR&locale=en&shmarker=546163&trs=320952"
          charSet="utf-8"
        ></script>
      </Helmet>
    </div>
  );
};

export default Tickets;
