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
=======
***This is the UserAuth Branch and have details related to only user Authentication***

## Features
> ### Account Creation
 * You can Create three Types of Users :- Flight Admin , Admin , Customer.
 * User registration based on their personal detail
 * An Otp would be sent to the provided EmailId , if within 5 min the user does not provide the otp , then the user will be removed
 * a jwt access token and refresh token is provided on login
 * an api is provided for refresh tokens to get new access token

|external applications|
|-|
|otp creator application|



## A Sample User 
  - firstName : "XYZ",
  - lastName : "ABC",
  - email : "xyz12email.com",
  - birthDate : "10-25-2000",
  - password  : "XYz@123456",
  - userType : "CUSTOMER", (optional, if not provided , default is customer),
>>>>>>> userAuth




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
=======
### get All user 
* GET `/flightApp/api/v1/users`

### get Single User
*  GET `/flightApp/api/v1/users/:id`
  
### update user
*  PUT `/flightApp/api/v1/users/:id`

