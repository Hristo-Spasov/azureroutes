// import Header from "../components/Header/Header";
import FlightList from "../components/FlightList/FlightList";
import style from "./Home.module.scss";
import Search from "../assets/airplane-in-flight-fill.svg?react";
import Landing from "../assets/airplane-landing-fill.svg?react";
import TakeOff from "../assets/airplane-takeoff-fill.svg?react";
import Clouds from "../assets/clouds-2-parts.svg?react";
import hero from "../assets/hero.png";
import { useContext, useEffect, useState } from "react";
import { FetchContext } from "../context/fetch-context";
import { ClockProvider } from "../context/clock-context";
import { Toaster } from "react-hot-toast";
import { FlightFetchContext } from "../context/flight-context";
import useResize from "../hooks/useResize";
import Introduction from "../components/Introduction/Introduction";

function Home() {
  const airportChecked = "search_airport";
  const flightChecked = "search_flight";
  const {
    search,
    setSearch,
    searchHandler,
    clickHandler,
    keyHandler,
    setArrivalActive,
    setDepartureActive,
    arrivalActive,
    departureActive,
    departureData,
    arrivalData,
    arrivalDataLoading,
    departureDataLoading,
  } = useContext(FetchContext);

  const {
    flightData,
    flightDataLoading,
    flightClickHandler,
    flightKeyHandler,
  } = useContext(FlightFetchContext);

  const [searchOption, setSearchOption] = useState(airportChecked);
  const isMobile = useResize(600);

  const handleArrivalClick = () => {
    if (arrivalData) {
      setArrivalActive(true);
      setDepartureActive(false);
    }
  };

  const handleDepartureClick = () => {
    if (departureData) {
      setDepartureActive(true);
      setArrivalActive(false);
    }
  };

  const searchOptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOption(e.target.value);
  };

  const disableDiv: React.CSSProperties = {
    pointerEvents: arrivalDataLoading || departureDataLoading ? "none" : "auto",
  };

  useEffect(() => {
    setSearch("");
  }, [searchOption]);

  const placeHolder: string =
    searchOption === airportChecked
      ? "Search for airport using IATA or ICAO code e.g. MAN"
      : "Search for a flight using flight number e.g. FR1837";

  return (
    <>
      {/* Alerts */}
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      {/* <Header /> */}
      {/* Main Page */}
      <main className={style.main_section}>
        <img src={hero} alt="hero" className={style.hero_image} />

        <section className={style.sub_section}>
          <div className={`${style.search_container}`}>
            {!isMobile && (
              <div className={style.clouds_container}>
                <Clouds />
              </div>
            )}
            <form role="search" className={style.form}>
              {/* Radio buttons */}
              <div className={style.radio_container}>
                <label htmlFor={airportChecked}>
                  <input
                    type="radio"
                    name="search_option"
                    id={airportChecked}
                    value={airportChecked}
                    checked={searchOption === airportChecked}
                    onChange={searchOptionHandler}
                  />
                  Search for Airport
                </label>

                <label htmlFor={flightChecked}>
                  {" "}
                  <input
                    type="radio"
                    name="search_option"
                    id={flightChecked}
                    value={flightChecked}
                    checked={searchOption === flightChecked}
                    onChange={searchOptionHandler}
                  />
                  Search for Flight
                </label>
              </div>

              {/* Search bar */}
              <div className={style.search_bar_container}>
                <div className={style.search_input_wrapper}>
                  <input
                    placeholder={placeHolder}
                    type="search"
                    className={style.search_bar}
                    onChange={searchHandler}
                    onKeyDown={
                      searchOption === airportChecked
                        ? keyHandler
                        : flightKeyHandler
                    }
                    value={search.toUpperCase()}
                    disabled={arrivalDataLoading || departureDataLoading}
                  />
                </div>
                {!isMobile && (
                  <div
                    className={style.search_btn_wrapper}
                    onClick={
                      searchOption === airportChecked
                        ? clickHandler
                        : flightClickHandler
                    }
                  >
                    <Search width={40} height={40} />
                  </div>
                )}
              </div>
            </form>
            <div
              className={`  ${
                searchOption === airportChecked
                  ? style.arr_dep_container
                  : style.buttons_hidden
              } `}
            >
              {/* Arrival Button */}
              <div
                className={
                  arrivalActive ? style.arrival_btn_active : style.arrival_btn
                }
                onClick={handleArrivalClick}
                style={disableDiv}
              >
                <button>
                  <Landing width={30} height={30} />
                  Arrival
                </button>
              </div>
              {/* Departure button */}
              <div
                className={
                  departureActive
                    ? style.departure_btn_active
                    : style.departure_btn
                }
                onClick={handleDepartureClick}
                style={disableDiv}
              >
                <button>
                  Departure
                  <TakeOff width={30} height={30} />
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* Clock */}
        <ClockProvider>
          <FlightList
            searchOption={searchOption}
            airportChecked={airportChecked}
            flightChecked={flightChecked}
          />
        </ClockProvider>
        {/* Introduction */}
        {searchOption === airportChecked &&
          !arrivalData &&
          !departureData &&
          !arrivalDataLoading &&
          !departureDataLoading && <Introduction />}
        {searchOption === flightChecked &&
          !flightData &&
          !flightDataLoading && <Introduction />}
      </main>
    </>
  );
}

export default Home;
