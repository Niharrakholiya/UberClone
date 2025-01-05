# Uber Clone Backend

# API Documentation

## POST `/users/register`

### Description
Registers a new user with the provided information.

### Request Body
- `fullname.firstname` (string, required): The first name of the user. Must be at least 3 characters long.
- `fullname.lastname` (string, optional): The last name of the user. Must be at least 3 characters long.
- `email` (string, required): The email address of the user. Must be a valid email address.
- `password` (string, required): The password for the user. Must be at least 5 characters long.

### Status Codes
- `201 Created`: The user was successfully registered.
- `400 Bad Request`: The request was invalid or missing required fields.

### Example Request
```json
{
    "fullname":{
        "firstname": "Jane",
        "lastname":"Doe"
    },
    "email":"jane.doe@example.com",
    "password":"janedoe"
}
```
### Example Response
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "_id": "60d0fe4f5311236168a109ca",
        "fullname": {
            "firstname": "Jane",
            "lastname": "Doe"
        },
        "email": "jane.doe@example.com",
        "socketId": null
    }
}
```

## POST `/users/login`

### Description
Logs in a user with the provided email and password.

### Request Body
- `email` (string, required): The email address of the user. Must be a valid email address.
- `password` (string, required): The password for the user. Must be at least 6 characters long.

### Status Codes
- `200 OK`: The user was successfully logged in.
- `400 Bad Request`: The request was invalid or missing required fields.
- `401 Unauthorized`: The email or password is incorrect.

### Example Request
```json
{
    "email": "jane.doe@example.com",
    "password": "janedoe"
}
```
### Example Response
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "_id": "60d0fe4f5311236168a109ca",
        "fullname": {
            "firstname": "Jane",
            "lastname": "Doe"
        },
        "email": "jane.doe@example.com",
        "socketId": null
    }
}
```

## GET `/users/profile`

### Description
Fetches the profile of the authenticated user.

### Headers
- `Authorization` (string, required): The token of the authenticated user.

### Status Codes
- `200 OK`: The user profile was successfully fetched.
- `401 Unauthorized`: The user is not authenticated.

### Example Request
```
GET /users/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
### Example Response
```
{
    "_id": "60d0fe4f5311236168a109ca",
    "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "socketId": null
}
```

## GET `/users/logout`

### Description
Logs out the authenticated user and blacklists the token.

### Headers
- `Authorization` (string, required): The token of the authenticated user.

### Status Codes
- `200 OK`: The user was successfully logged out.
- `401 Unauthorized`: The user is not authenticated or the token is blacklisted.

### Example Request
```
GET /users/logout
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
### Example Response
```
{
    "message": "Logged out successfully"
}
```

## POST `/captains/register`

### Description
Registers a new captain with the provided information.

### Request Body
- `fullname.firstname` (string, required): The first name of the captain. Must be at least 3 characters long.
- `fullname.lastname` (string, optional): The last name of the captain. Must be at least 3 characters long.
- `email` (string, required): The email address of the captain. Must be a valid email address.
- `password` (string, required): The password for the captain. Must be at least 5 characters long.
- `vehicle.color` (string, required): The color of the vehicle. Must be at least 3 characters long.
- `vehicle.plate` (string, required): The plate number of the vehicle. Must be at least 3 characters long.
- `vehicle.capacity` (number, required): The capacity of the vehicle. Must be a number.
- `vehicle.vehicleType` (string, required): The type of the vehicle. Must be one of 'car', 'motorcycle', 'auto'.
- `vehicle.location.lat` (number, required): The latitude of the vehicle's location.
- `vehicle.location.long` (number, required): The longitude of the vehicle's location.

### Status Codes
- `201 Created`: The captain was successfully registered.
- `400 Bad Request`: The request was invalid or missing required fields.

### Example Request
```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "johndoe",
    "vehicle": {
        "color": "Red",
        "plate": "XYZ123",
        "capacity": 4,
        "vehicleType": "car",
        "location": {
            "lat": 37.7749,
            "long": -122.4194
        }
    }
}
```
### Example Response
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
        "_id": "60d0fe4f5311236168a109cb",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "vehicle": {
            "color": "Red",
            "plate": "XYZ123",
            "capacity": 4,
            "vehicleType": "car",
            "location": {
                "lat": 37.7749,
                "long": -122.4194
            }
        },
        "socketId": null,
        "status": "inactive"
    }
}
```

## POST `/captains/login`

### Description
Logs in a captain with the provided email and password.

### Request Body
- `email` (string, required): The email address of the captain. Must be a valid email address.
- `password` (string, required): The password for the captain. Must be at least 6 characters long.

### Status Codes
- `200 OK`: The captain was successfully logged in.
- `400 Bad Request`: The request was invalid or missing required fields.
- `401 Unauthorized`: The email or password is incorrect.

### Example Request
```json
{
    "email": "john.doe@example.com",
    "password": "johndoe"
}
```
### Example Response
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
        "_id": "60d0fe4f5311236168a109cb",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "vehicle": {
            "color": "Red",
            "plate": "XYZ123",
            "capacity": 4,
            "vehicleType": "car",
            "location": {
                "lat": 37.7749,
                "long": -122.4194
            }
        },
        "socketId": null,
        "status": "inactive"
    }
}
```

## GET `/captains/profile`

### Description
Fetches the profile of the authenticated captain.

### Headers
- `Authorization` (string, required): The token of the authenticated captain.

### Status Codes
- `200 OK`: The captain profile was successfully fetched.
- `401 Unauthorized`: The captain is not authenticated.

### Example Request
```
GET /captains/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
### Example Response
```
{
    "_id": "60d0fe4f5311236168a109cb",
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
        "color": "Red",
        "plate": "XYZ123",
        "capacity": 4,
        "vehicleType": "car",
        "location": {
            "lat": 37.7749,
            "long": -122.4194
        }
    },
    "socketId": null,
    "status": "inactive"
}
```

## GET `/captains/logout`

### Description
Logs out the authenticated captain and blacklists the token.

### Headers
- `Authorization` (string, required): The token of the authenticated captain.

### Status Codes
- `200 OK`: The captain was successfully logged out.
- `401 Unauthorized`: The captain is not authenticated or the token is blacklisted.

### Example Request
```
GET /captains/logout
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
### Example Response
```
{
    "message": "Logged out successfully"
}
```