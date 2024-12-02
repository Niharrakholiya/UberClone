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