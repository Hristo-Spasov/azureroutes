import style from "./FlightGeneralInfo.module.scss";
import FlightsListDetailedData from "../FlightsListDetailedData/FlightsListDetailedData";
import React, { useContext, useEffect, useState } from "react";
import { FetchContext } from "../../context/fetch-context";
import ReactPaginate from "react-paginate";
import { FlightDataType } from "../../types/flight_types";
import { FlightFetchContext } from "../../context/flight-context";

interface FlightGeneralInfoProps {
  flightSearchButtonCondition: boolean;
  airportSearchButtonCondition: boolean;
}

const FlightGeneralInfo = React.memo(
  ({
    flightSearchButtonCondition,
    airportSearchButtonCondition,
  }: FlightGeneralInfoProps): JSX.Element => {
    const { departureData, arrivalData, arrivalActive, departureActive } =
      useContext(FetchContext);
    const { flightData } = useContext(FlightFetchContext);

    const [selectedPage, setSelectedPage] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    const itemsPerPage = 10;

    const endOffset = itemOffset + itemsPerPage;

    let pageCount = 0;

    if (arrivalActive && arrivalData) {
      pageCount = Math.ceil(arrivalData.data.length / itemsPerPage);
    } else if (departureActive && departureData) {
      pageCount = Math.ceil(departureData.data.length / itemsPerPage);
    }

    const handlePageClick = (selectedItem: { selected: number }) => {
      // Get arrivalData length or default to 0
      const arrivalDataLength = arrivalData?.data?.length ?? 0;

      // Get departureData length or default to 0
      const departureDataLength = departureData?.data?.length ?? 0;

      // Determine activeData based on arrivalActive
      const activeData = arrivalActive
        ? arrivalDataLength
        : departureDataLength;

      const newOffset = (selectedItem.selected * itemsPerPage) % activeData;
      setItemOffset(newOffset);
      setSelectedPage(selectedItem.selected);
    };

    useEffect(() => {
      setItemOffset(0);
      setSelectedPage(0);
    }, [arrivalActive, departureActive, arrivalData, departureData]); //Resetting the page back to 1

    const getCurrentItems = (data: FlightDataType[], selectedPage: number) => {
      return data
        .slice(itemOffset, endOffset)
        .map((el, index) => (
          <FlightsListDetailedData
            key={index}
            selectedPage={selectedPage}
            el={el}
          />
        ));
    };

    const renderFlights = (selectedPage: number) => {
      if (arrivalActive && arrivalData) {
        return getCurrentItems(arrivalData.data, selectedPage);
      } else if (departureActive && departureData) {
        return getCurrentItems(departureData.data, selectedPage);
      }
    };

    return (
      <ul className={style.list_container}>
        {flightSearchButtonCondition &&
          flightData &&
          flightData?.data?.map((el, index) => (
            <FlightsListDetailedData key={index} el={el} />
          ))}

        {airportSearchButtonCondition && (
          <>
            {renderFlights(selectedPage)}

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
          </>
        )}
      </ul>
    );
  }
);

export default FlightGeneralInfo;
