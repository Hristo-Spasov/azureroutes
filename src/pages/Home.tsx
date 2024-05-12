import FlightList from "../components/FlightList/FlightList";
import style from "./Home.module.scss";
import Clouds from "../assets/clouds-2-parts.svg?react";
import hero from "../assets/hero.png";
import hero_mobile from "../assets/hero_mobile.png";
import { useContext, useEffect, useRef, useState } from "react";
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
import SuggestionsDropdown from "../components/SuggestionsDropdown/SuggestionsDropdown";

function Home() {
  const airportChecked = "search_airport";
  const flightChecked = "search_flight";
  const {
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
  const searchbarRef = useRef<HTMLInputElement | null>(null);

  const debouncedAutoSuggestion = useDebouncedCallback((query) => {
    autoSuggestion(query);
  }, 100);

  //Fetching Handlers
  let isEnterPressed = false; // Flag to track if Enter key is pressed

  const airportHandlerConditions = search === "" || search.length < 3;

  const flightHandlerConditions =
    searchFlightFormatted === "" || searchFlightFormatted.length < 3;

  //search handler
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);
    setSuggestion(suggestionsArray[0]);
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
      // console.log(data);
      setSuggestionsArray(data);
      setSuggestion(data[0]);

      if (query == "") {
        setSuggestionsArray([]);
      }
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  // useEffect(() => {
  //   console.log(search);
  // }, [suggestion]);
  // useEffect(() => {
  //   console.log(search);
  // }, [search]);

  // useEffect(() => {
  //   console.log("Suggestion", suggestion);
  // }, [suggestion]);

  // console.log("isEnterPressed", isEnterPressed);
  // console.log("searchAirportFormatted", searchAirportFormatted);

  //TODO need to add focus back to the input when autosuggest is clicked
  //TODO Find why formatted string variable is not updating MAJOR BUG
  //!Combined Handlers
  const airportCombinedHandler = async (
    event?: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Check if an event is provided and whether Enter key is pressed
    if (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        isEnterPressed = true; // Set the flag if Enter key is pressed
      } else {
        isEnterPressed = false; // Reset the flag for other keys
      }
    }

    // Check if it's a click or Enter key press
    if ((!event && !isEnterPressed) || isEnterPressed) {
      // Show error message if conditions are met
      if (airportHandlerConditions) {
        toast.error(
          "Search airport using IATA (3 characters) or ICAO (4 characters) code",
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

      setSearch(
        `${suggestionsArray[0].airport_name}, ${suggestionsArray[0].location}`
      );
      setSuggestionsArray([]);

      // Set the state of active arrival and departure
      setArrivalActive(false);
      setDepartureActive(false);

      // Use cached data if available
      if (!cachedArrData && !cachedDepData) {
        await Promise.all([arrFetch(), depFetch()]);
      } else {
        setArrivalData(cachedArrData);
        setDepartureData(cachedDepData);
      }

      // Reset search and set arrival active
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
    if (searchbarRef.current) {
      searchbarRef.current.focus();
    }
    setSearch(`${suggestions.airport_name}, ${suggestions.location}`);
    setSuggestion(suggestions);
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

  // const handleSuggestionKeyClick = (
  //   suggestions: AutoSuggestionsType,
  //   e: React.KeyboardEvent<HTMLLIElement>
  // ) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     setSearch(`${suggestions.airport_name}, ${suggestions.location}`);
  //     setSuggestion(suggestions);
  //     setSuggestionsArray([]);
  //   }
  // };

  // Radio buttons handler
  const searchOptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOption(e.target.value);
  };

  //searchbar reset
  useEffect(() => {
    setSearch("");
    setSuggestionsArray([]);
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
        <img
          src={!isMobile ? hero : hero_mobile}
          alt="hero image"
          className={style.hero_image}
        />

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
                searchbarRef={searchbarRef}
                searchHandler={searchHandler}
                searchOption={searchOption}
                airportChecked={airportChecked}
                AirportKeyHandler={AirportKeyHandler}
                flightKeyHandler={flightKeyHandler}
                AirportClickHandler={AirportClickHandler}
                flightClickHandler={flightClickHandler}
              />

              <SuggestionsDropdown
                suggestionsArray={suggestionsArray}
                // handleSuggestionKeyClick={handleSuggestionKeyClick}
                handleSuggestionClick={handleSuggestionClick}
              />
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
