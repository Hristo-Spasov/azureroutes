// import style from "../FlightGeneralInfo/FlightGeneralInfo.module.scss";
// import React, { useContext } from "react";
// import { FlightFetchContext } from "../../context/flight-context";
// import FlightsListDetailedData from "../FlightsListDetailedData/FlightsListDetailedData";

// interface FlightGeneralInfoProps {
//   flightSearchButtonCondition: boolean;
//   airportSearchButtonCondition: boolean;
// }

// const FlightInformation = React.memo(
//   ({ flightSearchButtonCondition }: FlightGeneralInfoProps): JSX.Element => {
//     const { flightData } = useContext(FlightFetchContext);

//     return (
//       <ul className={style.list_container}>
//         {flightSearchButtonCondition &&
//           flightData &&
//           flightData?.data?.map((el, index) => (
//             <FlightsListDetailedData key={index} el={el} />
//           ))}
//       </ul>
//     );
//   }
// );

// export default FlightInformation;

import style from "../FlightGeneralInfo/FlightGeneralInfo.module.scss";
import FlightsListDetailedData from "../FlightsListDetailedData/FlightsListDetailedData";
import React, { useContext } from "react";

import { FlightFetchContext } from "../../context/flight-context";

interface FlightGeneralInfoProps {
  flightSearchButtonCondition: boolean;
  airportSearchButtonCondition: boolean;
}

const FlightInformation = React.memo(
  ({ flightSearchButtonCondition }: FlightGeneralInfoProps): JSX.Element => {
    const { flightData } = useContext(FlightFetchContext);

    return (
      <ul className={style.list_container}>
        {flightSearchButtonCondition &&
          flightData &&
          flightData?.data?.map((el, index) => (
            <FlightsListDetailedData key={index} el={el} />
          ))}
      </ul>
    );
  }
);

export default FlightInformation;
