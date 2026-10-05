![Logo](https://res.cloudinary.com/dh3yknk5o/image/upload/c_scale,w_1600/v1726159411/azure_routes_ufxiyk.png)

# Azure Routes

https://www.azureroutes.com/

A full-stack flight information web app that centralizes daily airport flight
schedules and live flight status lookups - no more digging through individual
airport websites.

* View daily arrivals/departures for any airport
* Check a flight's live status by flight number (IATA or ICAO format)
* Airport search with autosuggestions, local timezones, weather and travel news

The backend is a private repo. This document describes the full architecture.

## Architecture

```
Browser (React SPA, Vercel)
   |                                   +- AirLabs API    (live schedules)
   +--> Express API (Coolify VPS) -----+- WeatherAPI.com (weather widget)
   |    (Docker, TLS, API-key auth)    +- GNews          (travel news)
   |
   +--> Supabase (PostgreSQL - airport search autosuggestions,
                    airport names for response enrichment)
```

**Design decisions worth noting:**

* **Provider-agnostic data layer** - the flight provider sits behind a mapping
  layer (`mapAirlabs.js`): the original provider (AviationStack) was replaced
  with AirLabs by rewriting a single service file. The API contract to the
  frontend never changed.
* **Three caching layers, each with a different reason:**
  - Flight schedules: 5-min TTL in-memory cache (protects the free provider
    quota; boards don't change faster)
  - Airline names: full airlines DB fetched once, persisted to disk,
    self-healing refresh when an unknown airline code appears
  - Airport names/timezones: own Supabase airport DB, in-memory cached
* **Timezone derivation** - airport UTC offsets are computed from the provider
  data itself (local vs UTC time per flight), requiring zero extra API calls.
* **Defense-in-depth input validation** - flight number format (IATA/ICAO
  regex) is validated client-side for instant UX feedback *and* server-side,
  so bad input returns a friendly 400 instead of a provider 500.


## Features

### Daily Flight Schedule
- Search any airport's daily schedule (IATA `TBS` or ICAO `UGTB` codes)
- Separate arrivals/departures boards
- Autosuggestions powered by a custom Supabase airport database
- Airport-local times with derived UTC offsets
- Current weather for the destination
- Travel-related news feed

### Flight Status Lookup
- Check any flight by number - IATA (`FR1837`) or ICAO (`THY1837`) formats
- Live statuses: scheduled / active / landed / cancelled + delay minutes
- Instant validation with helpful error messages for malformed input

## Tech Stack

**Client:** React 19, TypeScript, TanStack Query v5, React Router 7, Vite 7,
SCSS, Framer Motion

**Autosuggestions:** PostgreSQL (Supabase)

**Server:** Node, Express 5, AirLabs API, Docker

**Deploy:** Frontend on Vercel - API self-hosted on a Coolify VPS
(Docker, automatic TLS)

## Usage

Select Search Mode

*Airport Schedule by default*

The user is presented with two radio buttons to choose between:

- Airport Schedule: to search for a daily schedule of flights at a specific airport.
- Flight Status: to search for the status of a specific flight using its flight number.

Search Bar with Autosuggestions

- The search bar adapts based on the selected search mode:
  - Airport mode: typing shows autosuggestions for airport names or codes.
  - Flight mode: search by flight number (validated client-side).

Arrival/Departure Selection

- Arrival Flights: all incoming flights to the airport.
- Departure Flights: all outgoing flights from the airport.

Search

- Submitting the query displays real-time flight schedules or the status of
  the selected flight, with live estimated/actual times and delays.

## Screenshots

*Main area of the website*
![App Screenshot](https://res.cloudinary.com/dh3yknk5o/image/upload/v1726160536/search_bar_wwlnbm.png)

*The list of available flights*
![App Screenshot](https://res.cloudinary.com/dh3yknk5o/image/upload/v1726160537/list_of_flights_wsei3m.png)

*The available information for the chosen flight*
![App Screenshot](https://res.cloudinary.com/dh3yknk5o/image/upload/v1726160537/flight_info_dslwlw.png)

## Development

```bash
# Client (this repo)
npm install
npm run dev          # http://localhost:5173

# Server (private repo)
npm install
npm run dev          # http://localhost:3000
```

Both projects need their `.env` - see the provided `.env.example` in each.

## Data Coverage

Flight data is provided by AirLabs' schedule database. Major airports have
complete live boards; small regional airports (or seasonal charter-only
airports off-season) may legitimately show empty boards for a given day.
