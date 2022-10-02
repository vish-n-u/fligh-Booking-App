# Flight Booking App
This project is node.js back-end code for a Flight booking application that allow syou to book ,schedule and update a flight

* This is the UserAuth Branch and have details related to only user Auth *
## Features
> ### Account Creation
* You can Create three Types of Users :- Flight Admin , Admin , Customer.
* For registration (a sample User):-
  -firstName : "XYZ",
  - lastName : "ABC",
  - email : "xyz12email.com",
  - birthDate : "10-25-2000",
  - password  : "XYz@123456",
  - userType : "CUSTOMER", (optional, if not provided , default is customer),
 * An Otp would be sent to the provided EmailId , if within 5 min the user does not provide the otp , then the user will be removed
 * a jwt access token and refresh tokken is provided on login
 * an api is set for refresh tokens which can be used to authenticate user after the access token expires.

> # REST API paths
## registration 
* `POST  /flighBooking/ap1/v1/registration`
  
  
