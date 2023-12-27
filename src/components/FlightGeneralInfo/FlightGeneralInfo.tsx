import style from "./FlightGeneralInfo.module.scss";
import FlightsListDetailedData from "../FlightsListDetailedData/FlightsListDetailedData";
import React, { useContext, useState } from "react";
import { FetchContext } from "../../context/search-context";
import ReactPaginate from "react-paginate";

const FlightGeneralInfo = React.memo((): JSX.Element => {
  const { departure, arrival, arrivalActive, departureActive } =
    useContext(FetchContext);

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  const endOffset = itemOffset + itemsPerPage;

  const pageCountArrival = Math.ceil(arrival.data.length / itemsPerPage);
  const pageCountDeparture = Math.ceil(departure.data.length / itemsPerPage);

  const pageCount = arrivalActive
    ? pageCountArrival
    : departureActive
    ? pageCountDeparture
    : 0;

  const handlePageClick = (selectedItem: { selected: number }) => {
    const activeData = arrivalActive
      ? arrival.data.length
      : departure.data.length;

    const newOffset = (selectedItem.selected * itemsPerPage) % activeData;

    setItemOffset(newOffset);
  };

  const getCurrentItems = (data: any[], className: string) => {
    return data
      .slice(itemOffset, endOffset)
      .map((el, index) => (
        <FlightsListDetailedData key={index} {...el} className={className} />
      ));
  };

  const renderFlights = (className: string) => {
    if (arrivalActive && arrival) {
      return getCurrentItems(arrival.data, className);
    } else if (departureActive && departure) {
      return getCurrentItems(departure.data, className);
    }
    return null;
  };

  return (
    <ul className={style.container}>
      {renderFlights(style.container)}
      {pageCount > 0 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className={style.pagination}
        />
      )}
    </ul>
  );
});

export default FlightGeneralInfo;
