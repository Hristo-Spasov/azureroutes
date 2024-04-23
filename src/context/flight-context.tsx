import { useState, createContext, ReactNode, useEffect } from "react";
import { FlightDataType } from "../types/flight_types";
import { useQuery } from "react-query";
import { API_KEY, fetchFlightData } from "../utils/fetchHelpers";

interface ApiResponse<T> {
  data: T[];
}

interface FlightFetchContextType<T> {
  flightData: ApiResponse<T> | undefined;
  cachedData: ApiResponse<T> | undefined;
  setFlightData: React.Dispatch<
    React.SetStateAction<ApiResponse<T> | undefined>
  >;
  flightDataLoading: boolean;
  flightFetch: () => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  searchFlightFormatted: string;
}

export const FlightFetchContext = createContext<
  FlightFetchContextType<FlightDataType>
>({
  flightData: undefined,
  cachedData: undefined,
  flightFetch: () => {},
  flightDataLoading: false,
  setFlightData: () => {},
  search: "",
  setSearch: () => {},
  searchFlightFormatted: "",
});

interface FlightFetchProviderProps {
  children: ReactNode;
}

export const FlightProvider = ({ children }: FlightFetchProviderProps) => {
  const [search, setSearch] = useState<string>("");
  const [flightData, setFlightData] = useState<ApiResponse<FlightDataType>>();

  //!To remove in the future
  useEffect(() => {
    console.log("flightData:", flightData);
  }, [flightData]);

  const searchFlightFormatted = search.trim().replace(/[^\w ]/g, ""); //Removing special symbols if any in the search params.

  ///  React Query

  const {
    data: cachedData,
    refetch: flightFetch,
    isLoading: flightDataLoading,
  } = useQuery({
    queryKey: ["flightData", API_KEY, searchFlightFormatted],
    queryFn: () => fetchFlightData(searchFlightFormatted),
    enabled: false,
    onSuccess: (data) => setFlightData(data),
  });

  const value = {
    flightData,
    cachedData,
    flightFetch,
    setFlightData,
    flightDataLoading,
    search,
    setSearch,
    searchFlightFormatted,
  };

  return (
    <FlightFetchContext.Provider value={value}>
      {children}
    </FlightFetchContext.Provider>
  );
};
