import { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ArrDepButtons from "../../components/ArrDepButtons/ArrDepButtons";
import FlightList from "../../components/FlightList/FlightList";
import SearchForm from "../../components/SearchForm/SearchForm";
import { ClockProvider } from "../../context/clock-context";
import { FetchContext } from "../../context/fetch-context";
import style from "./AirportPage.module.scss";

const AIRPORT_CHECKED = "search_airport";
const FLIGHT_CHECKED = "search_flight";

const AirportPage = () => {
  const { code } = useParams<{ code: string }>();
  const upperCode = (code ?? "").toUpperCase().trim();
  const isValidCode = upperCode.length === 3 || upperCode.length === 4;

  const {
    searchAirport,
    boardsLoading,
    boardsError,
    arrivalData,
    departureData,
    arrivalActive,
    departureActive,
    searchOption,
    setSearchOption,
    setArrivalActive,
    setDepartureActive,
  } = useContext(FetchContext);

  // This page IS an airport page - assert the mode on mount. Without this, a
  // leftover "flight" mode from a previous page keeps the board render
  // conditions (searchOption === airportChecked) false and cards never show.
  useEffect(() => {
    setSearchOption(AIRPORT_CHECKED);
  }, [setSearchOption]);

  // Fetch boards whenever the code in the URL changes (TBS -> GYD via nav).
  useEffect(() => {
    if (isValidCode) {
      searchAirport(upperCode);
    }
  }, [upperCode, isValidCode, searchAirport]);

  // Default to the arrivals board once data lands.
  useEffect(() => {
    if (arrivalData) {
      setArrivalActive(true);
      setDepartureActive(false);
    }
  }, [arrivalData, setArrivalActive, setDepartureActive]);

  // Airport name comes from the Supabase enrichment in the board data itself.
  const firstFlight = arrivalData?.data[0];
  const airportName =
    firstFlight && firstFlight.arrival.iata === upperCode
      ? firstFlight.arrival.airport
      : departureData?.data[0] &&
        departureData.data[0].departure.iata === upperCode
      ? departureData.data[0].departure.airport
      : upperCode;

  const noResults =
    !boardsLoading &&
    !boardsError &&
    isValidCode &&
    ((arrivalActive && arrivalData?.data.length === 0) ||
      (departureActive && departureData?.data.length === 0) ||
      (!arrivalActive && !departureActive && arrivalData !== undefined));

  return (
    <>
      {/* React 19 hoists these into <head> natively. */}
      <title>{[airportName, " (", upperCode, ") Arrivals & Departures - Azure Routes"].join("")}</title>
      <link
        rel="canonical"
        href={["https://www.azureroutes.com/airport/", upperCode.toLowerCase()].join("")}
      />
      <meta
        name="description"
        content={["Live flight schedule for ", airportName, ": today's arrivals, departures, statuses, estimated and actual times with delays."].join("")}
      />
      <main className={style.main_section}>
        {/* Site-wide search: same SearchForm as Home - search from any page. */}
        <section className={style.general_section} aria-label="Airport search">
          <SearchForm />
        </section>
        <section
          className={style.general_section}
          aria-label={[airportName, " information"].join("")}
        >
          <h1>
            {airportName} <span className={style.iata_code}>({upperCode})</span>
          </h1>
          <p>Live arrivals and departures for {airportName}.</p>
        </section>
        {isValidCode ? (
          <>
            {boardsError && (
              <section className={style.general_section}>
                <p>
                  Couldn't load flights: {boardsError}. Check your connection
                  or try again.
                </p>
                <button onClick={() => searchAirport(upperCode)}>Retry</button>
              </section>
            )}
            {!boardsError && (
              <>
                <ArrDepButtons
                  searchOption={searchOption}
                  airportChecked={AIRPORT_CHECKED}
                />
                <ClockProvider>
                  <FlightList
                    searchOption={searchOption}
                    airportChecked={AIRPORT_CHECKED}
                    flightChecked={FLIGHT_CHECKED}
                  />
                </ClockProvider>
                {noResults && (
                  <section className={style.general_section}>
                    <p>
                      No flights found for {airportName} today - this airport
                      may have no scheduled traffic at the moment, or the
                      provider has no data for it today.
                    </p>
                  </section>
                )}
              </>
            )}
          </>
        ) : (
          <section className={style.general_section}>
            <p>
              Invalid airport code. Use an IATA code (3 characters, e.g. TBS)
              or an ICAO code (4 characters, e.g. UGTB) -{" "}
              <Link to="/" className={style.link}>
                back to search
              </Link>
            </p>
          </section>
        )}
      </main>
    </>
  );
};

export default AirportPage;
