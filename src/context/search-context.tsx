import { useState, createContext, ReactNode, useEffect } from "react";

interface FetchContextType {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  arrival: any;
  setArrival: React.Dispatch<React.SetStateAction<any>>;
  departure: any;
  setDeparture: React.Dispatch<React.SetStateAction<any>>;
  searchHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clickHandler: () => void;
  keyHandler: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  arrivalActive: boolean;
  setArrivalActive: React.Dispatch<React.SetStateAction<boolean>>;
  departureActive: boolean;
  setDepartureActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FetchContext = createContext<FetchContextType>({
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
const API_KEY = "689c848518988e8c73b51b51e60124f0";

interface Props {
  children: ReactNode;
}

export const FetchProvider = ({ children }: Props) => {
  const [search, setSearch] = useState<string>("");
  const [departure, setDeparture] = useState();
  const [arrival, setArrival] = useState();
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

          const depData = await depResponse.json();
          const arrData = await arrResponse.json();

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
