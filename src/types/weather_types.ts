// AeroData API types
export type AirportType = {
  icao: string;
  iata: string;
  location: LocationType;
};
interface LocationType {
  lat: number;
  lon: number;
}

//Weather API Types

export type WeatherType = {
  current: CurrentType;
};
interface CurrentType {
  last_updated: string;
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  feelslike_f: number;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  humidity: number;
  cloud: number;
  condition: ConditionType;
}
interface ConditionType {
  text: string;
  icon: string;
  code: number;
}
