import FlightList from "../components/FlightList/FlightList";
import style from "./Home.module.scss";
import Clouds from "../assets/clouds-2-parts.svg?react";
import hero from "../assets/hero.png";
import hero_mobile from "../assets/hero_mobile.png";
import { Toaster } from "react-hot-toast";
import { ClockProvider } from "../context/clock-context";
import { FlightFetchContext } from "../context/flight-context";
import Introduction from "../components/Introduction/Introduction";
import SearchForm from "../components/SearchForm/SearchForm";
import useResize from "../hooks/useResize";
import Restrictions from "../components/Restrictions/Restrictions";
import News from "../components/News/News";
import { useContext } from "react";

function Home() {
  const airportChecked = "search_airport";
  const flightChecked = "search_flight";
  const {
    flightData,
    flightDataLoading,
  } = useContext(FlightFetchContext);

  const isMobile = useResize(600);

  //UI Conditionals
  // Home is the landing page now - airport searches navigate to
  // /airport/:code. Flight searches still render here via context state.
  const showIntroduction = !flightData && !flightDataLoading;

  return (
    <>
      <title>Azure Routes - Daily airport and flight schedules</title>
      <link rel="canonical" href="https://www.azureroutes.com/" />
      <meta
        name="description"
        content="Daily flight and airport schedules.Ease your traveling adventures with Azure Routes with daily airport schedules."
      />
      {/* Alerts */}
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      {/* Main Page */}
      <main className={style.main_section}>
        <img
          src={!isMobile ? hero : hero_mobile}
          alt="hero image"
          className={style.hero_image}
        />
        <section className={style.sub_section}>
          <div className={`${style.search_container}`}>
            {!isMobile && (
              <div className={style.clouds_container}>
                <Clouds />
              </div>
            )}
            {/* The search form (radios + searchbar + suggestions) is the
                shared SearchForm component - identical to before visually. */}
            <SearchForm />
          </div>
        </section>
        {/* Clock */}
        <ClockProvider>
          <FlightList
            searchOption={flightChecked}
            airportChecked={airportChecked}
            flightChecked={flightChecked}
          />
        </ClockProvider>
        {/* Introduction */}
        {showIntroduction && <Introduction />}

        <Restrictions />
        <News />
      </main>
    </>
  );
}

export default Home;
