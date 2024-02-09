import style from "./FlightsListDetailedData.module.scss";
import DownArrow from "../../assets/down-arrow-svgrepo-com.svg?react";
import { FlightDataType } from "../../types/flight_types";
import { useContext, useEffect, useState } from "react";
import { FetchContext } from "../../context/fetch-context";
import Dropdown from "../Dropdown/Dropdown";
import { AnimatePresence, motion } from "framer-motion";

interface FlightsListDetailedDataProps {
  el: FlightDataType;
  selectedPage: number;
}

const FlightsListDetailedData = (props: FlightsListDetailedDataProps) => {
  const { arrival, departure, airline, flight, flight_date, flight_status } =
    props.el;
  const { selectedPage } = props;
  const [toggle, setToggle] = useState<boolean>(false);
  const { arrivalActive, departureActive, arrivalData, departureData } =
    useContext(FetchContext);

  const toggleDropdown = () => {
    setToggle((prev) => !prev);
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

  const variants = {
    parent_container: {
      scale: 1,
    },
    initial: {
      backgroundColor: "#ffffff",
      borderRadius: "80px 80px 80px 80px",
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.5,
      },
    },
    active: {
      backgroundColor: "#1f3d60",
      borderRadius: "80px 80px 0px 0px",
      color: "#ffffff",
    },
    hover_active: {
      outline: "none",
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    hover_inactive: {
      outline: "2px solid #1f3d60",
      transition: {
        duration: 0.1,
        ease: "easeInOut",
      },
    },
    codeInitial: {
      color: "#1f3d60",
      // Set the initial color of the spans
    },
    codeActive: {
      color: "#ffffff", // Set the active color of the spans
    },
    arrowInitial: {
      top: "100%",
      left: "50%",
      x: "-50%",
      y: "-50%",
      backgroundColor: "#ffffff",
      rotate: 0,
      borderRadius: "80px 80px 80px 80px",
    },
    arrowActive: {
      top: "100%",
      left: "50%",
      x: "-50%",
      y: "-50%",
      backgroundColor: "#1f3d60",
      borderRadius: "80px",
      rotate: "180deg",
    },
    arrowHoverActive: {
      borderRadius: "80px",
      y: "-40%",
      transition: {
        delay: 0,
        duration: 0,
      },
    },
    arrowHoverInactive: {
      borderRadius: "80px",
      y: "-40%",
      transition: {
        delay: 0,
        duration: 0,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      animate={"parent_container"}
      whileHover={{ scale: 1.05 }}
      // transition={{ duration: 0.3 }}
      className={style.list_element_container}
    >
      <motion.li
        animate={toggle ? "active" : "initial"}
        variants={variants}
        whileHover={toggle ? "hover_active" : "hover_inactive"}
        // transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`${style.information_wrapper}`}
        onClick={toggleDropdown}
      >
        <div className={style.codes_container}>
          <div className={style.inner_wrapper}>
            <span>ICAO</span>
            <motion.span
              variants={variants}
              animate={toggle ? "codeActive" : "codeInitial"}
              className={style.codes}
            >
              {departure.icao}
            </motion.span>
          </div>
          <div className={style.inner_wrapper}>
            <span>IATA</span>
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
          <span>Airport</span>
          <motion.span
            variants={variants}
            animate={toggle ? "codeActive" : "codeInitial"}
            className={style.airport_operator_names}
          >
            {departure.airport}
          </motion.span>
        </div>
        <div className={style.airport_operator_container}>
          <span>Airline</span>
          <motion.span
            variants={variants}
            animate={toggle ? "codeActive" : "codeInitial"}
            className={style.airport_operator_names}
          >
            {airline.name === "empty" ? "Private" : airline.name}
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
