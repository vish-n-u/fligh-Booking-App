# Flight Booking App
This project is node.js back-end code for a Flight booking application that allow syou to book ,schedule and update a flight

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




> ## REST API paths
### registration 
* POST `/flighBooking/ap1/v1/registration`

### LOGIN 
*  POST `/flighBooking/ap1/v1/login`
  
### OtpCheck
*  POST `/flighBooking/ap1/v1/otpCheck`

### refreshToken
* GET `/flighBooking/ap1/v1/token`
  
  
