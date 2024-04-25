import { useContext } from "react";
import Search from "../../assets/airplane-in-flight-fill.svg?react";
import useResize from "../../hooks/useResize";
import style from "./Searchbar.module.scss";
import { FetchContext } from "../../context/fetch-context";
import { FlightFetchContext } from "../../context/flight-context";

interface SearchbarProps {
  searchOption: string;
  airportChecked: string;

  flightKeyHandler: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  AirportKeyHandler: (e: React.KeyboardEvent<HTMLInputElement>) => void;

  searchHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  AirportClickHandler: () => void;
  flightClickHandler: () => void;
}

const Searchbar = (props: SearchbarProps) => {
  const { arrivalDataLoading, departureDataLoading } = useContext(FetchContext);
  const { search } = useContext(FlightFetchContext);
  const isMobile = useResize(600);
  const {
    searchHandler,
    searchOption,
    airportChecked,
    AirportKeyHandler,
    flightKeyHandler,
    AirportClickHandler,
    flightClickHandler,
  } = props;

  const placeHolder: string =
    searchOption === airportChecked
      ? "Search for airport using Airport name"
      : "Search for a flight using flight number e.g. FR1837";

  return (
    <div className={style.search_bar_container}>
      <div className={style.search_input_wrapper}>
        <input
          placeholder={placeHolder}
          type="search"
          className={style.search_bar}
          onChange={searchHandler}
          onKeyDown={
            searchOption === airportChecked
              ? AirportKeyHandler
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
              ? AirportClickHandler
              : flightClickHandler
          }
        >
          <Search width={40} height={40} />
        </div>
      )}
    </div>
  );
};

export default Searchbar;
