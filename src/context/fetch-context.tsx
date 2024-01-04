import { useState, createContext, ReactNode, useEffect } from "react";
import { ArrDepType } from "../types/flight_types";
import fetchData from "../utils/fetchData";

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
}

export const FetchContext = createContext<FetchContextType<ArrDepType>>({
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
});

const BASE_URL = "http://api.aviationstack.com/v1/";
const API_KEY = import.meta.env.VITE_AVIATIONSTACK_KEY;

interface Props {
  children: ReactNode;
}

export const FetchProvider = ({ children }: Props) => {
  const [search, setSearch] = useState<string>("");
  const [departureData, setDepartureData] = useState<ApiResponse<ArrDepType>>();
  const [arrivalData, setArrivalData] = useState<
    ApiResponse<ArrDepType> | undefined
  >();
  const [arrivalActive, setArrivalActive] = useState<boolean>(false);
  const [departureActive, setDepartureActive] = useState<boolean>(false);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    console.log("Arrival:", arrivalData);
    console.log("Departure:", departureData);
  }, [arrivalData, departureData]);

  const searchFormatted = search.trim().replace(/[^\w ]/g, ""); //Removing special symbols if any in the search params.

  const clickHandler = async () => {
    if (searchFormatted === "") {
      //! TODO: Visualization of Bad Requests
      console.log(`Bad Request`);
      return;
    }

    if (search.trim() !== "") {
      const arrData = await fetchData<ApiResponse<ArrDepType>>({
        url: `${BASE_URL}flights?access_key=${API_KEY}&arr_iata=${searchFormatted}`,
      });
      const depData = await fetchData<ApiResponse<ArrDepType>>({
        url: `${BASE_URL}flights?access_key=${API_KEY}&dep_iata=${searchFormatted}`,
      });

      setSearch("");
      setArrivalData(arrData);
      setDepartureActive(false);
      setArrivalActive(true);
      setDepartureData(depData);
    }
  };
  const keyHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchFormatted === "") {
        //! TODO: Visualization of Bad Requests
        console.log(`Bad Request`);
        return;
      }
      if (search.trim() !== "") {
        const arrData = await fetchData<ApiResponse<ArrDepType>>({
          url: `${BASE_URL}flights?access_key=${API_KEY}&arr_iata=${searchFormatted}`,
        });
        const depData = await fetchData<ApiResponse<ArrDepType>>({
          url: `${BASE_URL}flights?access_key=${API_KEY}&dep_iata=${searchFormatted}`,
        });

        setSearch("");
        setArrivalData(arrData);
        setDepartureActive(false);
        setArrivalActive(true);
        setDepartureData(depData);
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
  };

  return (
    <FetchContext.Provider value={value}>{children}</FetchContext.Provider>
  );
};
