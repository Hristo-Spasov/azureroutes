import FlightList from "../components/FlightList/FlightList";
import style from "./Home.module.scss";
import Clouds from "../assets/clouds-2-parts.svg?react";
import hero from "../assets/hero.png";
import { useContext, useEffect, useState } from "react";
import { FetchContext } from "../context/fetch-context";
import { ClockProvider } from "../context/clock-context";
import toast, { Toaster } from "react-hot-toast";
import { FlightFetchContext } from "../context/flight-context";
import Introduction from "../components/Introduction/Introduction";
import RadioButtons from "../components/RadioButtons/RadioButtons";
import Searchbar from "../components/Searchbar/Searchbar";
import useResize from "../hooks/useResize";
import ArrDepButtons from "../components/ArrDepButtons/ArrDepButtons";
import Restrictions from "../components/Restrictions/Restrictions";
import News from "../components/News/News";
import supabase from "../utils/supabase";
import { useDebouncedCallback } from "use-debounce";
import { AutoSuggestionsType } from "../types/autosuggestion_types";

function Home() {
  const airportChecked = "search_airport";
  const flightChecked = "search_flight";
  const {
    searchAirportFormatted,
    setArrivalActive,
    setDepartureActive,
    departureData,
    arrivalData,
    arrivalDataLoading,
    departureDataLoading,
    arrFetch,
    depFetch,
    setArrivalData,
    setDepartureData,
    cachedArrData,
    cachedDepData,
    suggestion,
    setSuggestion,
  } = useContext(FetchContext);

  const {
    flightData,
    setFlightData,
    flightDataLoading,
    cachedData,
    flightFetch,
    search,
    setSearch,
    searchFlightFormatted,
  } = useContext(FlightFetchContext);

  const [searchOption, setSearchOption] = useState(airportChecked);
  const isMobile = useResize(600);
  const [suggestionsArray, setSuggestionsArray] = useState<
    AutoSuggestionsType[] | []
  >([]);

  const debouncedAutoSuggestion = useDebouncedCallback((query) => {
    autoSuggestion(query);
  }, 1000);

  useEffect(() => {
    console.log("Suggestion", suggestion);
  }, [suggestion]);

  //Fetching Handlers
  let isEnterPressed = false; // Flag to track if Enter key is pressed

  const airportHandlerConditions =
    searchAirportFormatted === "" ||
    (searchAirportFormatted.length !== 3 &&
      searchAirportFormatted.length !== 4);

  const flightHandlerConditions =
    searchFlightFormatted === "" || searchFlightFormatted.length < 3;

  //search handler
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);
    if (searchOption === airportChecked) {
      debouncedAutoSuggestion(query);
    }
  };

  //Querying for suggestions
  const autoSuggestion = async (query: string) => {
    try {
      const { data, error } = await supabase
        .from("airports")
        .select()
        .or(
          `airport_name.ilike.${query}%,iata.ilike.${query}%,icao.ilike.${query}%`
        )
        .limit(10);

      if (error) {
        console.error("Error fetching suggestions:", error);
        return;
      }
      console.log(data);
      setSuggestionsArray(data);
      if (query == "") {
        setSuggestionsArray([]);
      }
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  //!Combined Handlers
  const airportCombinedHandler = async (
    event?: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        isEnterPressed = true; // Set the flag if Enter key is pressed
      } else {
        isEnterPressed = false; // Reset the flag for other keys
      }
    }

    if (!event || isEnterPressed) {
      // Check if it's a click or Enter key press
      if (airportHandlerConditions) {
        toast.error(
          "Search airport using iata (3 characters) or icao (4 characters) code",
          {
            id: "bad request",
            position: "top-center",
            style: {
              marginTop: "5rem",
            },
          }
        );
        return;
      }

      setArrivalActive(false);
      setDepartureActive(false);

      //! Use cached data if such is present
      if (!cachedArrData && !cachedDepData) {
        await Promise.all([arrFetch(), depFetch()]);
      } else {
        setArrivalData(cachedArrData);
        setDepartureData(cachedDepData);
      }

      if (search.trim() !== "") {
        setSearch("");
        setArrivalActive(true);
      }
    }
  };

  const flightCombinedHandler = async (
    event?: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        isEnterPressed = true; // Set the flag if Enter key is pressed
      } else {
        isEnterPressed = false; // Reset the flag for other keys
      }
    }

    if (!event || isEnterPressed) {
      if (flightHandlerConditions) {
        console.log("flightHandlerConditions", flightHandlerConditions);
        toast.error("Search for flight using the flight number", {
          id: "bad request",
          position: "top-center",
          style: {
            marginTop: "5rem",
          },
        });
        return;
      }
      if (!cachedData) {
        await flightFetch();
      } else {
        setFlightData(cachedData);
      }

      if (search.trim() !== "") {
        setSearch("");
      }
    }
  };

  // Usage in click handler
  const AirportClickHandler = async () => {
    await airportCombinedHandler();
  };
  const flightClickHandler = async () => {
    await flightCombinedHandler();
  };
  const handleSuggestionClick = (suggestions: AutoSuggestionsType) => {
    setSearch(`${suggestions.airport_name}, ${suggestions.location}`);
    setSuggestion(suggestions);
    setSuggestionsArray([]);
  };

  // Usage in key handler
  const AirportKeyHandler = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    await airportCombinedHandler(e);
  };
  const flightKeyHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    await flightCombinedHandler(e);
  };

  const searchOptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOption(e.target.value);
  };

  //searchbar reset
  useEffect(() => {
    setSearch("");
  }, [searchOption]);

  //UI Conditionals
  const shouldRenderIntroductionForAirport =
    searchOption === airportChecked &&
    !arrivalData &&
    !departureData &&
    !arrivalDataLoading &&
    !departureDataLoading;

  const shouldRenderIntroductionForFlight =
    searchOption === flightChecked && !flightData && !flightDataLoading;

  return (
    <>
      {/* Alerts */}
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      {/* Main Page */}
      <main className={style.main_section}>
        <img src={hero} alt="hero" className={style.hero_image} />

        <section className={style.sub_section}>
          <div className={`${style.search_container}`}>
            {!isMobile && (
              <div className={style.clouds_container}>
                <Clouds />
              </div>
            )}
            <form role="search" className={style.form}>
              {/* Radio buttons */}
              <RadioButtons
                airportChecked={airportChecked}
                searchOption={searchOption}
                searchOptionHandler={searchOptionHandler}
                flightChecked={flightChecked}
              />
              {/* Search bar */}
              <Searchbar
                searchHandler={searchHandler}
                searchOption={searchOption}
                airportChecked={airportChecked}
                AirportKeyHandler={AirportKeyHandler}
                flightKeyHandler={flightKeyHandler}
                AirportClickHandler={AirportClickHandler}
                flightClickHandler={flightClickHandler}
              />

              {suggestionsArray.length > 0 && (
                <ul>
                  {suggestionsArray.map((suggestion) => (
                    <li
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {`${suggestion.airport_name}, ${suggestion.location}`}
                    </li>
                  ))}
                </ul>
              )}
            </form>
            {/* ArrDepButtons */}
            <ArrDepButtons
              searchOption={searchOption}
              airportChecked={airportChecked}
            />
          </div>
        </section>
        {/* Clock */}
        <ClockProvider>
          <FlightList
            searchOption={searchOption}
            airportChecked={airportChecked}
            flightChecked={flightChecked}
          />
        </ClockProvider>
        {/* Introduction */}
        {shouldRenderIntroductionForAirport && <Introduction />}
        {shouldRenderIntroductionForFlight && <Introduction />}

        <Restrictions />
        <News />
      </main>
    </>
  );
}

export default Home;
