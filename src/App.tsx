import Header from "./components/Header/Header";
import FlightList from "./components/FlightList/FlightList";
import style from "./App.module.scss";
import Search from "./assets/3844432_magnifier_search_zoom_icon.svg?react";
import Landing from "./assets/landing-thin-line.svg?react";
import TakeOff from "./assets/takeoff-thin.svg?react";
import { useContext, useState } from "react";
import { FetchContext } from "./context/search-context";

function App() {
  const { search, searchHandler, clickHandler } = useContext(FetchContext);
  const [arrivalActive, setArrivalActive] = useState<boolean>(false);
  const [departureActive, setDepartureActive] = useState<boolean>(false);

  const handleArrivalClick = () => {
    setArrivalActive(true);
    setDepartureActive(false);
  };

  const handleDepartureClick = () => {
    setDepartureActive(true);
    setArrivalActive(false);
  };

  return (
    <>
      <Header />
      <main className={style.main}>
        <div className={style.search_container}>
          <form role="search" className={style.search_wrapper}>
            <input
              placeholder="Search..."
              type="search"
              className={style.search}
              onChange={searchHandler}
              value={search}
            />
            <div className={style.search_btn_wrapper}>
              <Search width={30} height={30} onClick={clickHandler} />
            </div>
          </form>
          <div className={style.search_menu_wrapper}>
            {/* Buttons */}
            <div
              className={
                arrivalActive ? style.search_menu1_active : style.search_menu1
              }
              onClick={handleArrivalClick}
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
            >
              <button>
                <TakeOff width={50} height={50} /> Departure
              </button>
            </div>
          </div>
        </div>
        <FlightList />
      </main>
    </>
  );
}

export default App;
