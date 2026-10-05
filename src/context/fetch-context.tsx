import {
  useState,
  createContext,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { FlightDataType } from "../types/flight_types";
import { fetchArrivalData, fetchDepartureData } from "../utils/fetchHelpers";
import { AutoSuggestionsType } from "../types/autosuggestion_types";

interface ApiResponse<T> {
  data: T[];
}

interface FetchContextType<T> {
  searchAirportFormatted: string;
  arrivalData: ApiResponse<T> | undefined;
  setArrivalData: React.Dispatch<
    React.SetStateAction<ApiResponse<T> | undefined>
  >;
  departureData: ApiResponse<T> | undefined;
  setDepartureData: React.Dispatch<
    React.SetStateAction<ApiResponse<T> | undefined>
  >;
  suggestion: AutoSuggestionsType | undefined;
  setSuggestion: React.Dispatch<
    React.SetStateAction<AutoSuggestionsType | undefined>
  >;
  arrivalActive: boolean;
  setArrivalActive: React.Dispatch<React.SetStateAction<boolean>>;
  departureActive: boolean;
  setDepartureActive: React.Dispatch<React.SetStateAction<boolean>>;
  // True while an airport search (arrivals+departures) is in flight.
  boardsLoading: boolean;
  // Set when a board fetch fails (dead backend, CORS) - pages render a retry UI.
  boardsError: string | null;
  // Search mode shared between SearchForm and the board components.
  searchOption: string;
  setSearchOption: React.Dispatch<React.SetStateAction<string>>;
  searchAirport: (code: string) => Promise<void>;
}

export const FetchContext = createContext<FetchContextType<FlightDataType>>({
  searchAirportFormatted: "",
  arrivalData: undefined,
  setArrivalData: () => {},
  departureData: undefined,
  setDepartureData: () => {},
  arrivalActive: false,
  setArrivalActive: () => {},
  departureActive: false,
  setDepartureActive: () => {},
  boardsLoading: false,
  boardsError: null,
  searchOption: "search_airport",
  setSearchOption: () => {},
  searchAirport: async () => {},
  suggestion: undefined,
  setSuggestion: () => {},
});

interface FetchProviderProps {
  children: ReactNode;
}

export const FetchProvider = ({ children }: FetchProviderProps) => {
  const [departureData, setDepartureData] =
    useState<ApiResponse<FlightDataType>>();
  const [arrivalData, setArrivalData] = useState<ApiResponse<FlightDataType>>();
  const [arrivalActive, setArrivalActive] = useState<boolean>(false);
  const [departureActive, setDepartureActive] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<
    AutoSuggestionsType | undefined
  >();
  const [boardsLoading, setBoardsLoading] = useState<boolean>(false);
  const [boardsError, setBoardsError] = useState<string | null>(null);
  const [searchOption, setSearchOption] = useState<string>("search_airport");
  const queryClient = useQueryClient();

  const searchAirportFormatted = suggestion?.iata
    ? suggestion.iata
        .toUpperCase()
        .trim()
        .replace(/[^\w ]/g, "")
    : ""; // Use an empty string as a fallback if `suggestion` is `undefined`

  //!To remove in the future
  const isDev = import.meta.env.VITE_STATUS === "development";
  useEffect(() => {
    if (isDev) console.log("Arrival:", arrivalData);
  }, [arrivalData, isDev]);
  useEffect(() => {
    if (isDev) console.log("Departure:", departureData);
  }, [departureData, isDev]);
  useEffect(() => {
    if (isDev) console.log("searchAirportFormatted:", searchAirportFormatted);
  }, [searchAirportFormatted, isDev]);


  // useCallback: stable identity across renders - AirportPage's effect depends
  // on this; an inline function would re-trigger the fetch loop every render.
  const searchAirport = useCallback(
    async (code: string) => {
      if (!code) return;
      setBoardsError(null);
      setBoardsLoading(true);
      try {
        const [arr, dep] = await Promise.all([
          queryClient.query({
            queryKey: ["arrivalData", code],
            queryFn: () => fetchArrivalData(code),
          }),
          queryClient.query({
            queryKey: ["departureData", code],
            queryFn: () => fetchDepartureData(code),
          }),
        ]);
        if (arr) setArrivalData(arr);
        if (dep) setDepartureData(dep);
      } catch (error) {
        // Surface failures instead of failing silently (dead backend, CORS).
        setBoardsError(
          error instanceof Error ? error.message : "Failed to load flights"
        );
      } finally {
        setBoardsLoading(false);
      }
    },
    [queryClient]
  );

  const value = {
    searchAirportFormatted,
    arrivalData,
    setArrivalData,
    departureData,
    setDepartureData,
    arrivalActive,
    setArrivalActive,
    departureActive,
    setDepartureActive,
    boardsLoading,
    boardsError,
    searchOption,
    setSearchOption,
    searchAirport,
    suggestion,
    setSuggestion,
  };

  return (
    <FetchContext.Provider value={value}>{children}</FetchContext.Provider>
  );
};
