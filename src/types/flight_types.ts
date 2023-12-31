export interface ArrDepType {
  icao: string;
  iata: string;
  airport: string;
  timezone: string;
  scheduled: string;
  estimated: string;
  actual: string;
  delay: string;
}

export interface Airline {
  name: string;
  iata: string;
  icao: string;
}

export interface FlightType {
  number: string;
  iata: string;
  icao: string;
}
