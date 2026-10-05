import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";
import RadioButtons from "../RadioButtons/RadioButtons";
import Searchbar from "../Searchbar/Searchbar";
import SuggestionsDropdown from "../SuggestionsDropdown/SuggestionsDropdown";
import { FetchContext } from "../../context/fetch-context";
import { FlightFetchContext } from "../../context/flight-context";
import supabase from "../../utils/supabase";
import { AutoSuggestionsType } from "../../types/autosuggestion_types";
import style from "../../pages/Home.module.scss";

const AIRPORT_CHECKED = "search_airport";
const FLIGHT_CHECKED = "search_flight";

// Flight number formats: IATA = 2-char code + digits (FR1837, W6123),
// ICAO = 3-char code + digits (THY1837). Validated client-side for instant
// feedback and to avoid wasting API quota on garbage input.
const FLIGHT_IATA_PATTERN = /^[A-Z0-9]{2}\d{1,4}[A-Z]?$/i;
const FLIGHT_ICAO_PATTERN = /^[A-Z]{3}\d{1,4}$/i;

/**
 * The site-wide search form: mode radios + searchbar + suggestions dropdown.
 * Used on Home (hero) and AirportPage. Airport searches navigate to the
 * canonical /airport/:code page; flight searches render via context state.
 */
const SearchForm = () => {
  const [suggestionsArray, setSuggestionsArray] = useState<
    AutoSuggestionsType[] | []
  >([]);
  const [suggestion, setSuggestion] = useState<AutoSuggestionsType>();
  const searchbarRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const {
    setSuggestion: setContextSuggestion,
    searchOption,
    setSearchOption,
  } = useContext(FetchContext);
  // search lives in FlightFetchContext (Searchbar binds value={search} to it)
  // - must be the SAME state, not a local copy, or typing appears to do nothing.
  const {
    search,
    setSearch,
    searchFlight,
    searchFlightFormatted,
  } = useContext(FlightFetchContext);

  const searchAirportFormatted = suggestion?.iata
    ? suggestion.iata.toUpperCase().trim().replace(/[^\w ]/g, "")
    : "";

  const debouncedAutoSuggestion = useDebouncedCallback((query: string) => {
    autoSuggestion(query);
  }, 80);

  // Querying for suggestions
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
      setSuggestionsArray(data);
      // suggestion at first is aways the first item of the array if no other airport is picked from the suggestions array
      setSuggestion(data[0]);

      if (query == "") {
        setSuggestionsArray([]);
      }
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  //search handler
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);
    setSuggestion(suggestionsArray[0]);
    if (searchOption === AIRPORT_CHECKED) {
      debouncedAutoSuggestion(query);
    }
  };

  const searchOptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOption(e.target.value);
  };

  // searchbar reset on mode change
  useEffect(() => {
    setSearch("");
    setSuggestionsArray([]);
  }, [searchOption, setSearch]);

  //!Combined Handlers
  // Airport: triggered by click (no event) or the Enter key only.
  const airportCombinedHandler = async (
    event?: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event && event.key !== "Enter") return;
    if (event) event.preventDefault();

    if (search === "" || search.length < 3) {
      toast.error(
        "Search airport using IATA (3 characters) or ICAO (4 characters) code",
        {
          id: "bad request",
          position: "top-center",
          style: { marginTop: "5rem" },
        }
      );
      return;
    }

    // Navigate to the canonical airport page - the URL is the source of
    // truth there (shareable, refreshable, indexable). AirportPage fetches.
    navigate(`/airport/${searchAirportFormatted.toLowerCase()}`);

    if (search.trim() !== "") {
      setSearch("");
    }
  };

  // Flight: triggered by click (no event) or the Enter key only.
  const flightCombinedHandler = async (
    event?: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event && event.key !== "Enter") return;
    if (event) event.preventDefault();

    const isFlightCodeValid =
      FLIGHT_IATA_PATTERN.test(searchFlightFormatted) ||
      FLIGHT_ICAO_PATTERN.test(searchFlightFormatted);

    if (searchFlightFormatted === "" || !isFlightCodeValid) {
      toast.error(
        "Invalid flight number - use IATA (e.g. FR1837) or ICAO (e.g. THY1837) format",
        {
          id: "bad request",
          position: "top-center",
          style: { marginTop: "5rem" },
        }
      );
      return;
    }

    await searchFlight(searchFlightFormatted);

    if (search.trim() !== "") {
      setSearch("");
    }
  };

  // Usage in key handler
  const AirportKeyHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    await airportCombinedHandler(e);
  };
  const flightKeyHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    await flightCombinedHandler(e);
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
    // Keep the provider-level suggestion in sync for anything reading it.
    setContextSuggestion(suggestions);
  };

  return (
    <form role="search" className={style.form}>
      {/* Radio buttons */}
      <RadioButtons
        airportChecked={AIRPORT_CHECKED}
        searchOption={searchOption}
        searchOptionHandler={searchOptionHandler}
        flightChecked={FLIGHT_CHECKED}
      />
      {/* Search bar */}
      <Searchbar
        searchbarRef={searchbarRef}
        searchHandler={searchHandler}
        searchOption={searchOption}
        airportChecked={AIRPORT_CHECKED}
        AirportKeyHandler={AirportKeyHandler}
        flightKeyHandler={flightKeyHandler}
        AirportClickHandler={AirportClickHandler}
        flightClickHandler={flightClickHandler}
      />
      <SuggestionsDropdown
        suggestionsArray={suggestionsArray}
        handleSuggestionClick={handleSuggestionClick}
      />
    </form>
  );
};

export default SearchForm;