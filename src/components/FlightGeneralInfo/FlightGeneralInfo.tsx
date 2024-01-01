import style from "./FlightGeneralInfo.module.scss";
import FlightsListDetailedData from "../FlightsListDetailedData/FlightsListDetailedData";
import React, { useContext, useEffect, useState } from "react";
import { FetchContext } from "../../context/search-context";
import ReactPaginate from "react-paginate";

const FlightGeneralInfo = React.memo((): JSX.Element => {
  const { departure, arrival, arrivalActive, departureActive } =
    useContext(FetchContext);
  const [selectedPage, setSelectedPage] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  const endOffset = itemOffset + itemsPerPage;

  if (!arrival || !departure) {
    return <div>Loading...</div>;
  }

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
    setSelectedPage(selectedItem.selected);
  };

  useEffect(() => {
    setItemOffset(0);

    setSelectedPage(0);
  }, [arrivalActive, departureActive, arrival, departure]); //Resetting the page back to 1

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
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          className={style.pagination}
          activeClassName={style.active}
          pageClassName={style.page_wrapper}
          pageLinkClassName={style.page_wrapper}
          previousClassName={style.prev_btn}
          nextClassName={style.next_btn}
          forcePage={selectedPage}
        />
      )}
    </ul>
  );
});

export default FlightGeneralInfo;
