import { useState, createContext, ReactNode, useEffect } from "react";
import { FlightDataType } from "../types/flight_types";
import { useQuery } from "react-query";
import {
  API_KEY,
  fetchArrivalData,
  fetchDepartureData,
} from "../utils/fetchHelpers";
import toast from "react-hot-toast";

interface ApiResponse<T> {
  data: T[];
}

interface FetchContextType<T> {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  arrivalData: ApiResponse<T> | undefined;
  setArrivalData: React.Dispatch<
    React.SetStateAction<ApiResponse<T> | undefined>
  >;
  departureData: ApiResponse<T> | undefined;
  setDepartureData: React.Dispatch<
    React.SetStateAction<ApiResponse<T> | undefined>
  >;
  searchHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clickHandler: () => void;
  keyHandler: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  arrivalActive: boolean;
  setArrivalActive: React.Dispatch<React.SetStateAction<boolean>>;
  departureActive: boolean;
  setDepartureActive: React.Dispatch<React.SetStateAction<boolean>>;
  arrivalDataLoading: boolean;
  departureDataLoading: boolean;
  cachedArrData: ApiResponse<T> | undefined;
  cachedDepData: ApiResponse<T> | undefined;
}

export const FetchContext = createContext<FetchContextType<FlightDataType>>({
  search: "",
  setSearch: () => {},
  arrivalData: undefined,
  setArrivalData: () => {},
  departureData: undefined,
  setDepartureData: () => {},
  searchHandler: (_e) => {},
  clickHandler: () => {},
  keyHandler: (_e) => {},
  arrivalActive: false,
  setArrivalActive: () => {},
  departureActive: false,
  setDepartureActive: () => {},
  arrivalDataLoading: false,
  departureDataLoading: false,
  cachedArrData: undefined,
  cachedDepData: undefined,
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

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  //!To remove in the future
  useEffect(() => {
    console.log("Arrival:", arrivalData);
    console.log("Departure:", departureData);
  }, [arrivalData, departureData]);

  const searchFormatted = search.trim().replace(/[^\w ]/g, ""); //Removing special symbols if any in the search params.

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

  /// Handlers
  const handlerConditions =
    searchFormatted === "" ||
    (searchFormatted.length !== 3 && searchFormatted.length !== 4);

  const clickHandler = async () => {
    if (handlerConditions) {
      toast.error(
        "Search airport using iata (3 characters) or icao (4 characters) code",
        {
          id: "bad request",
          position: "top-center",
          style: {
            marginTop: "5rem",
          },
        }
      );
      return;
    }
    setArrivalActive(false);
    setDepartureActive(false);

    //! Use cached data if such is present
    if (!cachedArrData && !cachedDepData) {
      await Promise.all([arrFetch(), depFetch()]);
    } else {
      setArrivalData(cachedArrData);
      setDepartureData(cachedDepData);
    }

    if (search.trim() !== "") {
      setSearch("");
      setArrivalActive(true);
    }
  };

  const keyHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (handlerConditions) {
        toast.error(
          "Search airport using iata (3 characters) or icao (4 characters) code",
          {
            id: "bad request",
            position: "top-center",
            style: {
              marginTop: "5rem",
            },
          }
        );
        return;
      }
      setArrivalActive(false);
      setDepartureActive(false);

      //! Use cached data if such is present
      if (!cachedArrData && !cachedDepData) {
        await Promise.all([arrFetch(), depFetch()]);
      } else {
        setArrivalData(cachedArrData);
        setDepartureData(cachedDepData);
      }

      if (search.trim() !== "") {
        setSearch("");
        setArrivalActive(true);
      }
    }
  };

  const value = {
    search,
    setSearch,
    arrivalData,
    setArrivalData,
    departureData,
    setDepartureData,
    searchHandler,
    clickHandler,
    keyHandler,
    arrivalActive,
    setArrivalActive,
    departureActive,
    setDepartureActive,
    arrivalDataLoading,
    departureDataLoading,
    cachedArrData,
    cachedDepData,
  };

  return (
    <FetchContext.Provider value={value}>{children}</FetchContext.Provider>
  );
};
