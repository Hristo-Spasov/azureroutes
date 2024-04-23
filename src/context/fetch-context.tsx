import { useState, createContext, ReactNode, useEffect } from "react";
import { FlightDataType } from "../types/flight_types";
import { useQuery } from "react-query";
import {
  API_KEY,
  fetchArrivalData,
  fetchDepartureData,
} from "../utils/fetchHelpers";
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
  arrivalDataLoading: boolean;
  departureDataLoading: boolean;
  cachedArrData: ApiResponse<T> | undefined;
  cachedDepData: ApiResponse<T> | undefined;
  arrFetch: () => void;
  depFetch: () => void;
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
  arrivalDataLoading: false,
  departureDataLoading: false,
  cachedArrData: undefined,
  cachedDepData: undefined,
  arrFetch: () => {},
  depFetch: () => {},
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

  //!To remove in the future
  useEffect(() => {
    console.log("Arrival:", arrivalData);
    console.log("Departure:", departureData);
  }, [arrivalData, departureData]);

  const searchAirportFormatted = suggestion?.iata
    ? suggestion.iata
        .toUpperCase()
        .trim()
        .replace(/[^\w ]/g, "")
    : ""; // Use an empty string as a fallback if `suggestion` is `undefined`

  ///  React Query

  const {
    data: cachedArrData,
    refetch: arrFetch,
    isLoading: arrivalDataLoading,
  } = useQuery({
    queryKey: ["arrivalData", API_KEY, searchAirportFormatted],
    queryFn: () => fetchArrivalData(searchAirportFormatted),
    enabled: false,
    onSuccess: (data) => setArrivalData(data),
  });
  const {
    data: cachedDepData,
    refetch: depFetch,
    isLoading: departureDataLoading,
  } = useQuery({
    queryKey: ["departureData", API_KEY, searchAirportFormatted],
    queryFn: () => fetchDepartureData(searchAirportFormatted),
    enabled: false,
    onSuccess: (data) => setDepartureData(data),
  });

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
    arrivalDataLoading,
    departureDataLoading,
    cachedArrData,
    cachedDepData,
    arrFetch,
    depFetch,
    suggestion,
    setSuggestion,
  };

  return (
    <FetchContext.Provider value={value}>{children}</FetchContext.Provider>
  );
};
