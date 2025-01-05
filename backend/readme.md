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