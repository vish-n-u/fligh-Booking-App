# Flight Booking App
This project is node.js back-end code for a Flight booking application that allow syou to book ,schedule and update a flight

***This is the booking and payment Branch and have details related to only bookings and payment***

## Features
> ### Booking Creation
 * Any authorized user can create a booking for themself and an Admin can create a booking on behalf of someone else.
 * Along with booking a payment is also created in databse, the booking remains in pending state for 2 minutes within which the payment has
 to be made on a different api failing which the booking and payment would be in cancelled state.
 * If the payment is successful an EXTERNAL APPLICATION (notification app) is used to send emails to the client about the confirmation.
 * The external application uses MongoDB as its database.
 * An api is provided for cancelling bookings

|external applications|
|-|
|Notification application|



## A Sample Booking 
  - flightDateId :12,
  - userId : 2,
  - noOfSeats : 4 (max: 5 , min :1),
  - price : (a value is calculated and provided based on noOfSeats & price per seat),
  - bookingStatus  : (default value is SUCCESSFULL),
  
## A Sample Payment
  - bookingId : 09,
  - amount : (bookingId's price value),
  - paymentStatus : (default value is UNSUCCESSFULL)




> ## REST API paths
### get All Bookings 
* GET `/flightApp/ap1/v1/bookings`

### get Single Booking
*  GET `/flightApp/ap1/v1/bookings/:id`

### create Booking
*  POST `/flightApp/ap1/v1/bookings`

### cancel Booking
*  PUT `/flightApp/ap1/v1/bookings/:id`

### update Payment
*  PUT `/flightApp/ap1/v1/payment/:id`


  
