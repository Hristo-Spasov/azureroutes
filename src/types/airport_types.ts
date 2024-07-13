export interface Airport {
  pluginData: PluginData;
}

interface PluginData {
  details: Details;
  flightdiary?: FlightDiary;
  schedule: Schedule;
}

interface Details {
  name: string;
  code: Code;
  position?: Position;
  timezone?: Timezone;
  url?: URL;
  airportImages?: AirportImages;
  visible?: boolean;
}

interface Code {
  iata: string;
  icao: string;
}

interface Position {
  latitude?: number;
  longitude?: number;
  elevation?: number;
  country?: Country;
  region?: Region;
}

interface Country {
  name?: string;
  code?: string;
  id?: number;
}

interface Region {
  city: string;
}
interface Timezone {
  name: string;
  offset?: number;
  abbr?: string;
  abbrName?: string;
  isDst?: boolean;
}

interface URL {
  homepage?: string;
  webcam?: string | null;
  wikipedia?: string;
}

interface AirportImages {
  thumbnails?: Image[];
  medium?: Image[];
  large?: Image[];
}

interface Image {
  src: string;
  link: string;
  copyright: string;
  source: string;
}

interface FlightDiary {
  url: string;
  ratings: Ratings;
  comment: Comment[];
  reviews: number;
  evaluation: number;
}

interface Ratings {
  avg: number;
  total: number;
}

interface Comment {
  content: string;
  author: Author;
  timestamp: number;
}

interface Author {
  facebookId?: any; // Assuming this can be any type since it's null in the example
  name: string;
}

interface Schedule {
  arrivals?: FlightSchedule;
  departures?: FlightSchedule;
}

interface FlightSchedule {
  item?: DailyFlights;
  page?: Page;
  timestamp: number;
  data: FlightInformation[];
}

interface DailyFlights {
  current: number;
  total: number;
  limit: number;
}
interface Page {
  current: number;
  total: number;
}

interface FlightInformation {
  identification?: Identification;
  status: Status;
  aircraft: Aircraft;
  owner: AirlineOwner;
  airline: AirlineOwner;
  airport: FlightAirport;
  time: FlightTime;
}

interface Identification {
  id: string;
  row?: number;
  number: FlightNumber;
  callsign?: string;
}
interface FlightNumber {
  flightNumber: string;
}

interface Status {
  live: boolean;
  text: string;
  icon?: string;
  estimated?: string | null;
  ambiguous?: boolean;
  generic?: GenericStatus;
}

interface GenericStatus {
  status: GenericStatusDetails;
  eventTime: EventTime;
}

interface GenericStatusDetails {
  text: string;
  type: string;
  color: string;
  diverted: any; //To be typed properly in the future
}

interface EventTime {
  utc: number;
  local: number;
}

interface Aircraft {
  model: AircraftModel;
  registration: string;
  country: AircraftCountryOrigin;
  hex?: string;
  restricted: boolean;
  serialNo: boolean | null;
  age?: AircraftAge;
  availability?: AircraftAvailability;
}

interface AircraftModel {
  code: string;
  text: string;
}
interface AircraftCountryOrigin {
  id: number;
  name: string;
  alpha2?: string;
  alpha3?: string;
}

interface AircraftAge {
  availability: boolean;
}

interface AircraftAvailability {
  serialNo: boolean;
  age: boolean;
}

interface AirlineOwner {
  name: string;
  code: Code;
  logo?: string | null;
  short?: string;
}

interface FlightAirport {
  origin: OriginDestination;
  destination: Destination;
}

interface OriginDestination {
  code: Code;
  timezone?: Timezone;
  info: Info;
  name: string;
  position?: Position;
  visible?: boolean;
}

interface Info {
  terminal: string | null;
  baggage: string | null;
  gate: string | null;
}

interface Destination {
  timezone: Timezone;
  info: Info;
}

interface FlightTime {
  scheduled: ScheduledTime;
  real: RealTime;
  estimated: EstimatedTime;
  other: OtherTime;
}

interface ScheduledTime {
  departure: number | null;
  arrival: number | null;
}

interface RealTime {
  departure: number | null;
  arrival: number | null;
}

interface EstimatedTime {
  departure: number | null;
  arrival: number | null;
}

interface OtherTime {
  eta: number | null;
  duration: number | null;
}
