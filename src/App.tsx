import Header from "./components/Header/Header";
import FlightList from "./components/FlightList/FlightList";
import style from "./App.module.scss";
import Search from "./assets/3844432_magnifier_search_zoom_icon.svg?react";
import Landing from "./assets/landing-thin-line.svg?react";
import TakeOff from "./assets/takeoff-thin.svg?react";
import { useContext } from "react";
import { FetchContext } from "./context/fetch-context";
import { ClockProvider } from "./context/clock-context";
import { Toaster } from "react-hot-toast";

function App() {
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

  const disableDiv: React.CSSProperties = {
    pointerEvents: arrivalDataLoading || departureDataLoading ? "none" : "auto",
  };

  return (
    <>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <Header />
      <main className={style.main}>
        <div className={style.search_container}>
          <form role="search" className={style.search_wrapper}>
            <input
              placeholder="Search..."
              type="search"
              className={style.search}
              onChange={searchHandler}
              onKeyDown={keyHandler}
              value={search}
              disabled={arrivalDataLoading || departureDataLoading}
            />
            <div className={style.search_btn_wrapper} onClick={clickHandler}>
              <Search width={30} height={30} />
            </div>
          </form>
          <div className={style.search_menu_wrapper}>
            {/* Buttons */}
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
            <div
              className={
                departureActive ? style.search_menu2_active : style.search_menu2
              }
              onClick={handleDepartureClick}
              style={disableDiv}
            >
              <button>
                <TakeOff width={50} height={50} /> Departure
              </button>
            </div>
          </div>
        </div>
        <ClockProvider>
          <FlightList />
        </ClockProvider>
      </main>
    </>
  );
}

export default App;
