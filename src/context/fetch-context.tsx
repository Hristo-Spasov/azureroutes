import { useState, createContext, ReactNode, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchArrivalData, fetchDepartureData } from "../utils/fetchHelpers";
import { AutoSuggestionsType } from "../types/autosuggestion_types";
import { AirportData } from "../types/airport_types";

interface ApiResponse {
  data: AirportData;
}

interface FetchContextType {
  searchAirportFormatted: string;
  arrivalData: ApiResponse | undefined;
  setArrivalData: React.Dispatch<React.SetStateAction<ApiResponse | undefined>>;
  departureData: ApiResponse | undefined;
  setDepartureData: React.Dispatch<
    React.SetStateAction<ApiResponse | undefined>
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
  cachedArrData: ApiResponse | undefined;
  cachedDepData: ApiResponse | undefined;
  arrFetch: () => void;
  depFetch: () => void;
}

export const FetchContext = createContext<FetchContextType>({
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
  const [departureData, setDepartureData] = useState<ApiResponse>();
  const [arrivalData, setArrivalData] = useState<ApiResponse>();
  const [arrivalActive, setArrivalActive] = useState<boolean>(false);
  const [departureActive, setDepartureActive] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<
    AutoSuggestionsType | undefined
  >();

  //!To remove in the future
  if (import.meta.env.VITE_STATUS === "development") {
    useEffect(() => {
      console.log("Arrival:", arrivalData);
      console.log("Departure:", departureData);
    }, [arrivalData, departureData]);
    useEffect(() => {
      console.log("searchAirportFormatted:", searchAirportFormatted);
    }, [suggestion]);
  }
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
    queryKey: ["arrivalData", searchAirportFormatted],
    queryFn: () => fetchArrivalData(searchAirportFormatted),
    enabled: false,
    onSuccess: (data) => setArrivalData(data),
  });
  const {
    data: cachedDepData,
    refetch: depFetch,
    isLoading: departureDataLoading,
  } = useQuery({
    queryKey: ["departureData", searchAirportFormatted],
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
