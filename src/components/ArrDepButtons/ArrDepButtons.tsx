import { useContext } from "react";
import { FetchContext } from "../../context/fetch-context";
import style from "./ArrDepButtons.module.scss";
import Landing from "../../assets/airplane-landing-fill.svg?react";
import TakeOff from "../../assets/airplane-takeoff-fill.svg?react";

interface ArrDepButtonsProps {
  searchOption: string;
  airportChecked: string;
}

const ArrDepButtons = ({
  searchOption,
  airportChecked,
}: ArrDepButtonsProps) => {
  const {
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
    <div
      className={`  ${
        searchOption === airportChecked
          ? style.arr_dep_container
          : style.buttons_hidden
      } `}
    >
      {/* ArrDepButtons */}
      {/* Arrival Button */}
      <div
        className={arrivalActive ? style.arrival_btn_active : style.arrival_btn}
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
          departureActive ? style.departure_btn_active : style.departure_btn
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
  );
};

export default ArrDepButtons;
