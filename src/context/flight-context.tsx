import {
  useState,
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { FlightDataType } from "../types/flight_types";
import { useQuery } from "react-query";
import { API_KEY, fetchFlightData } from "../utils/fetchHelpers";
import { FetchContext } from "./fetch-context";

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
}

export const FlightFetchContext = createContext<
  FlightFetchContextType<FlightDataType>
>({
  flightData: undefined,
  cachedData: undefined,
  flightFetch: () => {},
  flightDataLoading: false,
  setFlightData: () => {},
});

interface FlightFetchProviderProps {
  children: ReactNode;
}

export const FlightProvider = ({ children }: FlightFetchProviderProps) => {
  const { search } = useContext(FetchContext);
  const [flightData, setFlightData] = useState<ApiResponse<FlightDataType>>();

  //!To remove in the future
  useEffect(() => {
    console.log("flightData:", flightData);
  }, [flightData]);

  const searchFormatted = search.trim().replace(/[^\w ]/g, ""); //Removing special symbols if any in the search params.

  ///  React Query

  const {
    data: cachedData,
    refetch: flightFetch,
    isLoading: flightDataLoading,
  } = useQuery({
    queryKey: ["flightData", API_KEY, searchFormatted],
    queryFn: () => fetchFlightData(searchFormatted),
    enabled: false,
    onSuccess: (data) => setFlightData(data),
  });

  const value = {
    flightData,
    cachedData,
    flightFetch,
    setFlightData,
    flightDataLoading,
  };

  return (
    <FlightFetchContext.Provider value={value}>
      {children}
    </FlightFetchContext.Provider>
  );
};
