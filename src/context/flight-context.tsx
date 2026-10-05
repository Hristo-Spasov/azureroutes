import { useState, createContext, ReactNode, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { FlightDataType } from "../types/flight_types";
import { fetchFlightData } from "../utils/fetchHelpers";

interface ApiResponse<T> {
  data: T[];
}

interface FlightFetchContextType<T> {
  flightData: ApiResponse<T> | undefined;
  setFlightData: React.Dispatch<
    React.SetStateAction<ApiResponse<T> | undefined>
  >;
  flightDataLoading: boolean;
  // Explicit search action: fetches the flight for the given number.
  // Resolves the key at call time - no stale-closure races.
  searchFlight: (flightNumber: string) => Promise<void>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  searchFlightFormatted: string;
}

export const FlightFetchContext = createContext<
  FlightFetchContextType<FlightDataType>
>({
  flightData: undefined,
  searchFlight: async () => {},
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
  const [flightDataLoading, setFlightDataLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const searchFlightFormatted = search.trim().replace(/[^\w ]/g, ""); //Removing special symbols if any in the search params.

  //!To remove in the future
  const isDev = import.meta.env.VITE_STATUS === "development";
  useEffect(() => {
    if (isDev) {
      console.log("flightData:", flightData);
      console.log("searchFlightFormatted:", searchFlightFormatted);
    }
  }, [flightData, searchFlightFormatted, isDev]);

  ///  React Query - explicit orchestration
  const searchFlight = async (flightNumber: string) => {
    if (!flightNumber) return;
    setFlightDataLoading(true);
    try {
      const result = await queryClient.fetchQuery({
        queryKey: ["flightData", flightNumber],
        queryFn: () => fetchFlightData(flightNumber),
      });
      if (result) setFlightData(result);
    } finally {
      setFlightDataLoading(false);
    }
  };

  const value = {
    flightData,
    searchFlight,
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
