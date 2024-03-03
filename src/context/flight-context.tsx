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
import toast from "react-hot-toast";
import { FetchContext } from "./fetch-context";

interface ApiResponse<T> {
  data: T[];
}

interface FlightFetchContextType<T> {
  flightData: ApiResponse<T> | undefined;
  setFlightData: React.Dispatch<
    React.SetStateAction<ApiResponse<T> | undefined>
  >;
  flightClickHandler: () => void;
  flightKeyHandler: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  flightDataLoading: boolean;
}

export const FlightFetchContext = createContext<
  FlightFetchContextType<FlightDataType>
>({
  flightData: undefined,
  flightDataLoading: false,
  setFlightData: () => {},
  flightClickHandler: () => {},
  flightKeyHandler: (_e) => {},
});

interface FlightFetchProviderProps {
  children: ReactNode;
}

export const FlightProvider = ({ children }: FlightFetchProviderProps) => {
  const { search, setSearch } = useContext(FetchContext);
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

  /// Handlers
  const handlerConditions =
    searchFormatted === "" || searchFormatted.length < 3;

  const flightClickHandler = async () => {
    if (handlerConditions) {
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
  };

  const flightKeyHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (handlerConditions) {
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

  const value = {
    flightData,
    setFlightData,
    flightClickHandler,
    flightKeyHandler,
    flightDataLoading,
  };

  return (
    <FlightFetchContext.Provider value={value}>
      {children}
    </FlightFetchContext.Provider>
  );
};
