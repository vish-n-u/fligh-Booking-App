# Flight Booking App
This project is node.js back-end code for a Flight booking application that allow syou to book ,schedule and update a flight

FlightDatesBranch
***This is the FlightDate Branch and have details related to only about flight details of a particular flight on a specific date***

## Features
> ### FlightDate Creation
 * You can Create a flight based on Flight Details(from database) , Date of the flight, number of available seats and price per seat.
 * Only An authorized Admin or a Flight Admin can create Flight's Date 
 * Two same flights cannot be created for the same date
 



## A Sample FlightDate 
  - firstName : "XYZ",
  - date : "2022-12-20",
  - noOSeats : (Is taken from Flight Detail Table),
  - noOfBookedSeats : 10 (default is 0)
  - pricePerSeat  : 3500,
  - flightId : 12,
  - flightAdminId : 219,
  - status : (defaultValue is UPCOMING),
  - startPoint : (Is taken from Flight Detail Table),
  - endPoint : (Is taken from Flight Detail Table)



> ## REST API paths
<<<<<<< FlightDatesBranch

### get FlightDates Based on QUERY 
* GET `/flightApp/api/v1/FlightDate`

### get All Flight Dates
*  GET `/flightApp/api/v1/FlightDates`
 
### create Multiple Flight Dates
* POST `/flightApp/api/v1/multiFlightDates`

### create Single Flight Date
* POST `/flightApp/api/v1/flightDates`

### update Flight Date
*  PUT `/flightApp/api/v1/FlightDates/:id`
