import Header from "./components/Header/Header";
import FlightList from "./components/FlightList/FlightList";
import style from "./App.module.scss";
import Search from "./assets/3844432_magnifier_search_zoom_icon.svg?react";
import Landing from "./assets/landing-thin-line.svg?react";
import TakeOff from "./assets/takeoff-thin.svg?react";
import { useContext, useState } from "react";
import { FetchContext } from "./context/fetch-context";
import { ClockProvider } from "./context/clock-context";
import { Toaster } from "react-hot-toast";
import { FlightFetchContext } from "./context/flight-context";
import hero from "./assets/hero.png";

function App() {
  const airportChecked = "search_airport";
  const flightChecked = "search_flight";
  const {
    search,
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

  const { flightClickHandler, flightKeyHandler } =
    useContext(FlightFetchContext);

  const [searchOption, setSearchOption] = useState(airportChecked);

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

  return (
    <>
      {/* Alerts */}
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <Header />
      {/* Main Page */}
      <main className={style.main}>
        <img src={hero} alt="hero" className={style.hero_image} />
        <div className={style.search_container}>
          <form
            role="search"
            className={`${style.form} ${
              searchOption === flightChecked ? style.rounded : ""
            }`}
          >
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
            <div className={style.search_wrapper}>
              <input
                placeholder="Search..."
                type="search"
                className={style.search}
                onChange={searchHandler}
                onKeyDown={
                  searchOption === airportChecked
                    ? keyHandler
                    : flightKeyHandler
                }
                value={search.toUpperCase()}
                disabled={arrivalDataLoading || departureDataLoading}
              />
              <div
                className={style.search_btn_wrapper}
                onClick={
                  searchOption === airportChecked
                    ? clickHandler
                    : flightClickHandler
                }
              >
                <Search width={30} height={30} />
              </div>
            </div>
          </form>

          {searchOption === airportChecked && (
            <div className={style.search_menu_wrapper}>
              {/* Arrival Button */}
              <div
                className={
                  arrivalActive ? style.search_menu1_active : style.search_menu1
                }
                onClick={handleArrivalClick}
                style={disableDiv}
              >
                <button>
                  <Landing width={50} height={50} />
                  Arrival
                </button>
              </div>
              {/* Departure button */}
              <div
                className={
                  departureActive
                    ? style.search_menu2_active
                    : style.search_menu2
                }
                onClick={handleDepartureClick}
                style={disableDiv}
              >
                <button>
                  <TakeOff width={50} height={50} /> Departure
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Clock */}
        <ClockProvider>
          <FlightList
            searchOption={searchOption}
            airportChecked={airportChecked}
            flightChecked={flightChecked}
          />
        </ClockProvider>
      </main>
    </>
  );
}

export default App;
