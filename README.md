# Flight Booking App
This project is node.js back-end code for a Flight booking application that allow's you to book ,schedule and update a flight

***This is the flightDetail Branch and have details related to only new flights and all the previous branches***

## Features
> ### Flight Creation
 * An admin or a Flight Admin can create a Flight.
 * The Flight needs to consist of the following Details:-
  - flightsName
  - Number of Seats
  - StartPoint
  - End Point
  - flight Admin Id
(for the purpose of simplicity in this project the each flight will have a fixed start and end point)


## A Sample Flight 
  - name : "spiceFlight",
  - noOfSeats : 125,
  - startPoint : "Kochi",
  - endPoint : "Mumbai"


> ## REST API paths
### create new Flight 
* POST `/flightApp/api/v1/flights`

### update Flight
*  PUT `/flightApp/api/v1/flights/:id`
  
### get single Flight Detail
*  GET `/flightApp/api/v1/flights/:id`

### get All Flight Detail
*  GET `/flightApp/api/v1/flights`
