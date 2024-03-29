import { useState, createContext, ReactNode, useEffect } from "react";
import { FlightDataType } from "../types/flight_types";
import { useQuery } from "react-query";
import {
  API_KEY,
  fetchArrivalData,
  fetchDepartureData,
} from "../utils/fetchHelpers";

interface ApiResponse<T> {
  data: T[];
}

interface FetchContextType<T> {
  search: string;
  searchFormatted: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  arrivalData: ApiResponse<T> | undefined;
  setArrivalData: React.Dispatch<
    React.SetStateAction<ApiResponse<T> | undefined>
  >;
  departureData: ApiResponse<T> | undefined;
  setDepartureData: React.Dispatch<
    React.SetStateAction<ApiResponse<T> | undefined>
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
  search: "",
  searchFormatted: "",
  setSearch: () => {},
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
});

interface FetchProviderProps {
  children: ReactNode;
}

export const FetchProvider = ({ children }: FetchProviderProps) => {
  const [search, setSearch] = useState<string>("");
  const [departureData, setDepartureData] =
    useState<ApiResponse<FlightDataType>>();
  const [arrivalData, setArrivalData] = useState<ApiResponse<FlightDataType>>();
  const [arrivalActive, setArrivalActive] = useState<boolean>(false);
  const [departureActive, setDepartureActive] = useState<boolean>(false);

  //!To remove in the future
  useEffect(() => {
    console.log("Arrival:", arrivalData);
    console.log("Departure:", departureData);
  }, [arrivalData, departureData]);

  const searchFormatted = search
    .toUpperCase()
    .trim()
    .replace(/[^\w ]/g, ""); //Removing special symbols if any in the search params.

  ///  React Query

  const {
    data: cachedArrData,
    refetch: arrFetch,
    isLoading: arrivalDataLoading,
  } = useQuery({
    queryKey: ["arrivalData", API_KEY, searchFormatted],
    queryFn: () => fetchArrivalData(searchFormatted),
    enabled: false,
    onSuccess: (data) => setArrivalData(data),
  });
  const {
    data: cachedDepData,
    refetch: depFetch,
    isLoading: departureDataLoading,
  } = useQuery({
    queryKey: ["departureData", API_KEY, searchFormatted],
    queryFn: () => fetchDepartureData(searchFormatted),
    enabled: false,
    onSuccess: (data) => setDepartureData(data),
  });

  const value = {
    search,
    searchFormatted,
    setSearch,
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
  };

  return (
    <FetchContext.Provider value={value}>{children}</FetchContext.Provider>
  );
};
