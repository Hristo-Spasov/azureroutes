import style from "./FlightsListDetailedData.module.scss";
import DownArrow from "../../assets/down-arrow-svgrepo-com.svg?react";
import { FlightDataType } from "../../types/flight_types";
import { useContext, useEffect, useState } from "react";
import { FetchContext } from "../../context/fetch-context";
import Dropdown from "../Dropdown/Dropdown";
import { AnimatePresence, motion } from "framer-motion";
import { variants, mobileVariants } from "./framer_variants";
import useResize from "../../hooks/useResize";

interface FlightsListDetailedDataProps {
  el: FlightDataType;
  selectedPage?: number;
}

const FlightsListDetailedData = (props: FlightsListDetailedDataProps) => {
  const { arrival, departure, airline, flight, flight_date, flight_status } =
    props.el;
  const { selectedPage } = props;
  const [toggle, setToggle] = useState<boolean>(false);
  const { arrivalActive, departureActive, arrivalData, departureData } =
    useContext(FetchContext);
  const isMobileView = useResize(600);

  const toggleDropdown = () => {
    setToggle((prev) => !prev);
  };

  //Takes a string and checks if the string length is bigger then the number param,if true - slicing the string and adding bread crumbs. To be used for longer text in mobile view
  const longName = (string: string, number: number) => {
    if (string.length > number) {
      return string.slice(0, number) + "...";
    }

    return string;
  };

  //Closing the dropdown on page change or section change
  useEffect(() => {
    setToggle(false);
  }, [
    arrivalActive,
    departureActive,
    arrivalData,
    departureData,
    selectedPage,
  ]);

  return (
    <motion.div
      variants={variants}
      animate={"parent_container"}
      whileHover={isMobileView ? { scale: 1 } : { scale: 1.05 }}
      className={style.list_element_container}
    >
      <motion.li
        animate={toggle ? "active" : "initial"}
        variants={isMobileView ? mobileVariants : variants}
        whileHover={toggle ? "hover_active" : "hover_inactive"}
        className={`${style.information_wrapper}`}
        onClick={toggleDropdown}
      >
        <div className={style.codes_container}>
          <div className={style.inner_wrapper}>
            <motion.span>ICAO</motion.span>
            <motion.span
              variants={variants}
              animate={toggle ? "codeActive" : "codeInitial"}
              className={style.codes}
            >
              {departure.icao}
            </motion.span>
          </div>
          <div className={style.inner_wrapper}>
            <motion.span>IATA</motion.span>
            <motion.span
              variants={variants}
              animate={toggle ? "codeActive" : "codeInitial"}
              className={style.codes}
            >
              {departure.iata}
            </motion.span>
          </div>
        </div>
        <div className={style.airport_operator_container}>
          <motion.span>Airport</motion.span>
          <motion.span
            variants={variants}
            animate={toggle ? "codeActive" : "codeInitial"}
            className={style.airport_operator_names}
          >
            {!isMobileView
              ? departure.airport
              : longName(departure.airport, 18)}
          </motion.span>
        </div>
        <div className={style.airport_operator_container}>
          <motion.span>Airline</motion.span>
          <motion.span
            variants={variants}
            animate={toggle ? "codeActive" : "codeInitial"}
            className={style.airport_operator_names}
          >
            {airline.name === "empty"
              ? "Private"
              : isMobileView
              ? longName(airline.name, 18)
              : airline.name}
          </motion.span>
        </div>

        <motion.span
          variants={variants}
          animate={toggle ? "arrowActive" : "arrowInitial"}
          whileHover={toggle ? "arrowHoverActive" : "arrowHoverInactive"}
          transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
          className={`${style.arrow_wrapper} ${
            toggle ? style.arrow_active : ""
          } `}
        >
          <DownArrow width={12} height={12} />
        </motion.span>
      </motion.li>
      {/* Dropdown Information */}
      <AnimatePresence>
        {toggle && (
          <Dropdown
            arrival={arrival}
            departure={departure}
            flight_date={flight_date}
            flight_status={flight_status}
            flight={flight}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FlightsListDetailedData;
