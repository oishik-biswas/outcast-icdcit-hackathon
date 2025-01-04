# Backend API Documentation

This is the backend for the Outcast ICDCiT Hackathon project. It is built using Node.js, Express, and MongoDB.

## Prerequisites

- Node.js
- npm
- MongoDB

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/outcast-icdcit-hackathon.git
    cd outcast-icdcit-hackathon/backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:
    ```dotenv
    PORT=4000
    MONGODB_URI=mongodb://localhost:27017/outcast
    SECRET=uber-clone-secret
    ```

## Running the Server

1. Start the MongoDB server:
    ```sh
    mongod
    ```

2. Start the backend server:
    ```sh
    npm start
    ```

The server will start on the port specified in the `.env` file (default is 4000).

## API Endpoints

### User Routes

#### Register a new user

- **URL:** `/users/register`
- **Method:** `POST`
- **Body:**
    ```json
    {
        "fullName": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "email": "john.doe@example.com",
        "password": "password123"
    }
    ```
- **Response:**
    ```json
    {
        "user": {
            "_id": "60d0fe4f5311236168a109ca",
            "fullName": {
                "firstName": "John",
                "lastName": "Doe"
            },
            "email": "john.doe@example.com"
        },
        "token": "your-jwt-token"
    }
    ```

#### Login a user

- **URL:** `/users/login`
- **Method:** `POST`
- **Body:**
    ```json
    {
        "email": "john.doe@example.com",
        "password": "password123"
    }
    ```
- **Response:**
    ```json
    {
        "user": {
            "_id": "60d0fe4f5311236168a109ca",
            "fullName": {
                "firstName": "John",
                "lastName": "Doe"
            },
            "email": "john.doe@example.com"
        },
        "token": "your-jwt-token"
    }
    ```

## Project Structure

- `server.js` - Entry point of the application
- `app.js` - Express application setup
- `db/db.js` - MongoDB connection setup
- `models/user.model.js` - User model definition
- `services/user.service.js` - User service for business logic
- `controllers/user.controller.js` - User controller for handling requests
- `routers/user.route.js` - User routes

## License

This project is licensed under the MIT License.