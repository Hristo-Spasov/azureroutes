import style from "./FlightGeneralInfo.module.scss";
import FlightsListDetailedData from "../FlightsListDetailedData/FlightsListDetailedData";
import React, { useContext, useState } from "react";
import { FetchContext } from "../../context/search-context";
import ReactPaginate from "react-paginate";

const FlightGeneralInfo = React.memo((): JSX.Element => {
  const { departure, arrival, arrivalActive, departureActive } =
    useContext(FetchContext);

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 13;

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = arrival.data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(arrival.data.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (selectedItem: { selected: number }) => {
    const newOffset =
      (selectedItem.selected * itemsPerPage) % arrival.data.length;
    console.log(
      `User requested page number ${selectedItem.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <ul className={style.container}>
      {arrivalActive && arrival
        ? currentItems.map((el: any, index: number) => (
            <FlightsListDetailedData key={index} {...el} />
          ))
        : ""}

      {departureActive && departure
        ? departure.data.map((el: any, index: number) => (
            <FlightsListDetailedData key={index} {...el} />
          ))
        : ""}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </ul>
  );
});

export default FlightGeneralInfo;
