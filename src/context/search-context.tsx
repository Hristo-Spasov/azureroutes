import { useState, createContext, ReactNode, useEffect } from "react";
import { ArrDepType } from "../types/flight_types";

interface ApiResponse<T> {
  data: T[];
}

interface FetchContextType<T> {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  arrival: ApiResponse<T> | undefined;
  setArrival: React.Dispatch<React.SetStateAction<ApiResponse<T> | undefined>>;
  departure: ApiResponse<T> | undefined;
  setDeparture: React.Dispatch<
    React.SetStateAction<ApiResponse<T> | undefined>
  >;
  searchHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clickHandler: () => void;
  keyHandler: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  arrivalActive: boolean;
  setArrivalActive: React.Dispatch<React.SetStateAction<boolean>>;
  departureActive: boolean;
  setDepartureActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FetchContext = createContext<FetchContextType<ArrDepType>>({
  search: "",
  setSearch: () => {},
  arrival: undefined,
  setArrival: () => {},
  departure: undefined,
  setDeparture: () => {},
  searchHandler: (_e) => {},
  clickHandler: () => {},
  keyHandler: (_e) => {},
  arrivalActive: false,
  setArrivalActive: () => {},
  departureActive: false,
  setDepartureActive: () => {},
});

const BASE_URL = "http://api.aviationstack.com/v1/";
const API_KEY = import.meta.env.VITE_AVIATIONSTACK_KEY;

interface Props {
  children: ReactNode;
}

export const FetchProvider = ({ children }: Props) => {
  const [search, setSearch] = useState<string>("");
  const [departure, setDeparture] = useState<
    ApiResponse<ArrDepType> | undefined
  >();
  const [arrival, setArrival] = useState<ApiResponse<ArrDepType> | undefined>();
  const [arrivalActive, setArrivalActive] = useState<boolean>(false);
  const [departureActive, setDepartureActive] = useState<boolean>(false);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    console.log("Arrival:", arrival);
    console.log("Departure:", departure);
  }, [arrival, departure]);

  const clickHandler = async () => {
    try {
      const arrResponse = await fetch(
        `${BASE_URL}flights?access_key=${API_KEY}&arr_iata=${search}`
      );
      const depResponse = await fetch(
        `${BASE_URL}flights?access_key=${API_KEY}&dep_iata=${search}`
      );

      if (!depResponse.ok || !arrResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const depData = await depResponse.json();
      const arrData = await arrResponse.json();

      setSearch("");
      setArrival(arrData);
      setArrivalActive(true);
      setDeparture(depData);
    } catch (e) {
      console.log((e as Error).message);
    }
  };
  const keyHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (search.trim() !== "") {
        try {
          const arrResponse = await fetch(
            `${BASE_URL}flights?access_key=${API_KEY}&arr_iata=${search}`
          );
          const depResponse = await fetch(
            `${BASE_URL}flights?access_key=${API_KEY}&dep_iata=${search}`
          );

          if (!depResponse.ok || !arrResponse.ok) {
            throw new Error("Failed to fetch data");
          }

          const arrData = await arrResponse.json();
          const depData = await depResponse.json();

          setSearch("");
          setArrival(arrData);
          setArrivalActive(true);
          setDeparture(depData);
        } catch (e) {
          console.log((e as Error).message);
        }
      }
    }
  };

  const value = {
    search,
    setSearch,
    arrival,
    setArrival,
    departure,
    setDeparture,
    searchHandler,
    clickHandler,
    keyHandler,
    arrivalActive,
    setArrivalActive,
    departureActive,
    setDepartureActive,
  };

  return (
    <FetchContext.Provider value={value}>{children}</FetchContext.Provider>
  );
};
