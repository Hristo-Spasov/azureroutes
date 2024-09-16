
![Logo](https://res.cloudinary.com/dh3yknk5o/image/upload/c_scale,w_1600/v1726159411/azure_routes_ufxiyk.png)


# Azure Routes
 https://azureroutes.com/
 
This project simplifies the process of checking daily flight schedules and flight statuses for various airports. Traditionally, checking flight details requires visiting individual airport websites, which can be time-consuming and cumbersome. This web application centralizes the process by allowing users to:
*    View daily flight schedules for any airport.
*    Check the status of a flight using its flight number.

The project is built using React and TypeScript for a scalable, efficient, and user-friendly experience.




## Features

Daily Flight Schedule

- Search for any airport’s daily flight schedule in a few clicks.
- Filter the schedule based on flight type (e.g., arrivals, departures).
- Autosuggestion
- Local time
- Current weather
- Travel related news

Flight Status Lookup
- Check the current status of any flight using its flight number.
- Get live updates on flight statuses (on time, delayed, or canceled)
- Travel related news

## Additional Features
⚠️ Important

*These are embedded features and lead the user to external sources where they can book their services. By using them, they are directly helping the project.*

- Ticket Booking
- Airport Transfers
- Hotel Booking *Coming soon*



## Tech Stack

**Client:** React, TypeScript, SCSS, React Router, React Query

**Autosuggestions:** PostgreSQL

**Server:** Node, Express


## Usage

Select Search Mode

 *Airport Schedule by default*

 The user is presented with two radio buttons to choose between:

- Airport Schedule: To search for a daily schedule of flights at a specific airport.

- Flight Status: To search for the status of a specific flight using its flight number.

Search Bar with Autosuggestions

- The search bar adapts based on the selected search mode:
        
- If Search for Airport is selected, typing in the search bar will show autosuggestions for airport names or codes.
        
- If Search for Flight is selected, the user can search for a flight using the flight number.

Arrival/Departure Selection

- For the Airport Schedule mode, two buttons will separate the data into arrival flight to the airport and departuring flights from the airport:
        
- Arrival Flights: Displays the schedule of all incoming flights to the airport.

- Departure Flights: Displays the schedule of all outgoing flights from the airport.

Search

- After filling out the required fields, the user can submit the query, and the results will display real-time flight schedules or the status of the selected flight if such data exists.


## Screenshots

*Main area of the website*
![App Screenshot](https://res.cloudinary.com/dh3yknk5o/image/upload/v1726160536/search_bar_wwlnbm.png)

*The list of available flights*
![App Screenshot](https://res.cloudinary.com/dh3yknk5o/image/upload/v1726160537/list_of_flights_wsei3m.png)


*The available information for the choosen flight*
![App Screenshot](https://res.cloudinary.com/dh3yknk5o/image/upload/v1726160537/flight_info_dslwlw.png)
## Known Issues

### Third-Party Data Provider Issues
#### The third-party provider responsible for supplying flight data is currently experiencing intermittent problems. As a result:

- Slow Response Times: Some requests may take longer than expected to return data.

- No Data Returned: In certain cases, requests may not return any data at all.

#### I'm actively working on finding a more reliable solution to improve the consistency and speed of data retrieval.