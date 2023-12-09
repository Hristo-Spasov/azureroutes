import Header from "./components/Header/Header";
import FlightList from "./components/FlightList/FlightList";
import style from "./App.module.scss";
import Search from "./assets/3844432_magnifier_search_zoom_icon.svg?react";

function App() {
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
            />
            <div className={style.search_btn_wrapper}>
              <Search width={30} height={30} />
            </div>
          </form>
          <div className={style.search_menu_wrapper}>
            <div className={style.search_menu1}>
              <button>Arrival</button>
            </div>
            <div className={style.search_menu2}>
              <button>Departure</button>
            </div>
          </div>
        </div>
        <FlightList />
      </main>
    </>
  );
}

export default App;
