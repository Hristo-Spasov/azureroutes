import style from "./Tickets.module.scss";
import { Helmet } from "react-helmet";

const Tickets = () => {
  return (
    <div>
      <Helmet>
        <script
          async
          src="https://tp.media/content?campaign_id=121&promo_id=4132&color_border=%232681ff&color_button_text=%23ffffff&color_button=%232681ff&plain=true&border_radius=0&powered_by=true&default_origin=London&curr=EUR&locale=en&shmarker=546163&trs=320944"
          charset="utf-8"
          onLoad={() => console.log("Script loaded successfully")}
          onError={() => console.error("Error loading script")}
        ></script>
      </Helmet>
    </div>
  );
};

export default Tickets;
