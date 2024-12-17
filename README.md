# User Registration API Documentation

## Endpoint: `user/register`

### Method: `POST`

### Description:

This endpoint is used to register a new user. It requires the user's first name, last name, email, and password. Upon successful registration, it returns the created user object and an authentication token.

### Request Body:

The request body should be in JSON format and include the following fields:

- `fullname`: An object containing:
  - `firstname` (string, required): The user's first name. Must be at least 3 characters long.
  - `lastname` (string, optional): The user's last name. Must be at least 3 characters long if provided.
- `email` (string, required): The user's email address. Must be a valid email format.
- `password` (string, required): The user's password. Must be at least 8 characters long.

#### Example Request Body:

{
"fullname": {
"firstname": "John",
"lastname": "Doe"
},
"email": "john.doe@example.com",
"password": "securePassword123"
}

### Responses:

- **201 Created**:

  - **Description**: User successfully registered.
  - **Body**: Returns the created user object and an authentication token.
  - **Example**:
    ```json
    {
      "user": {
        "_id": "60d0fe4f5311236168a109ca",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "role": "user"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

- **400 Bad Request**:

  - **Description**: Validation error due to missing or invalid fields.
  - **Body**: Returns an array of error messages.
  - **Example**:
    ```json
    {
      "errors": [
        {
          "msg": "Please enter a valid email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "First name is must be 3 characters long",
          "param": "fullname.firstname",
          "location": "body"
        }
      ]
    }
    ```

- **500 Internal Server Error**:
  - **Description**: An error occurred on the server.
  - **Body**: Returns an error message.

### Notes:

- Ensure that the email provided is unique and not already registered in the system.
- Passwords are securely hashed before being stored in the database.
