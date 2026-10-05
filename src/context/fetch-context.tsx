import { useState, createContext, ReactNode, useEffect } from "react";
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
  // Explicit search action: fetches BOTH boards for the given airport code.
  // Resolves the key at call time - safe against suggestion-click races.
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

  ///  React Query - explicit orchestration
  // queryClient.fetchQuery always resolves the key passed at CALL time (no
  // stale closures from a just-clicked suggestion) and hits the network when
  // cached data is stale. The server holds a 5-min TTL cache, so this is cheap.
  const searchAirport = async (code: string) => {
    if (!code) return;
    setBoardsLoading(true);
    try {
      const [arr, dep] = await Promise.all([
        queryClient.fetchQuery({
          queryKey: ["arrivalData", code],
          queryFn: () => fetchArrivalData(code),
        }),
        queryClient.fetchQuery({
          queryKey: ["departureData", code],
          queryFn: () => fetchDepartureData(code),
        }),
      ]);
      if (arr) setArrivalData(arr);
      if (dep) setDepartureData(dep);
    } finally {
      setBoardsLoading(false);
    }
  };

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
    searchAirport,
    suggestion,
    setSuggestion,
  };

  return (
    <FetchContext.Provider value={value}>{children}</FetchContext.Provider>
  );
};
