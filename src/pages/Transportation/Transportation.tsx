import { Helmet } from "react-helmet-async";
import Transfers from "../../components/Transfers/Transfers";
import style from "./Transportation.module.scss";
import transferCar from "../../assets/transportation/trickkyyy_A_yellow_taxi_is_driving_on_the_street_with_airport_s_e70ec9be-9fd2-46a5-aabf-84c7d2a76604.png";
const Transportation = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Azure Routes - Airport transfers and renta a car options</title>
        <link
          rel="canonical"
          href="https://www.azureroutes.com/transportation"
        />
        <meta
          name="description"
          content="Reliable and affordable airport transfers and car rental services. Enjoy seamless travel with comfortable vehicles and professional drivers. Book now for a stress-free journey from the airport to your destination."
        />
      </Helmet>
      <section className={style.general_section}>
        <h1>Touch Down and Take Off in Comfort</h1>
        <p>
          Experience effortless and reliable transportation to and from the
          airport. Whether you're arriving or departing, we've got you covered
          with comfort and convenience.
        </p>
        <img src={transferCar} alt="transfering car" />
      </section>
      <section className={style.general_section}>
        <h2>Seamless Airport Transfers</h2>
        <Transfers />
      </section>
    </>
  );
};

export default Transportation;
