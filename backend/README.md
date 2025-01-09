# Backend

## Description
This is the backend for a chat application. It is built using Node.js, Express, and MongoDB.

## Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the backend directory:
   ```sh
   cd backend
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

## Environment Variables
Create a `.env` file in the `backend` directory and add the following environment variables:
```
PORT=4000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
NODE_ENV=production
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
CLIENT_URL=http://localhost:5173
```

## Scripts
- `dev`: Starts the development server using `nodemon`.
- `start`: Starts the production server.

## Dependencies
- `bcryptjs`: ^2.4.3
- `cloudinary`: ^2.5.1
- `cookie-parser`: ^1.4.7
- `cors`: ^2.8.5
- `dotenv`: ^16.4.5
- `express`: ^4.21.1
- `jsonwebtoken`: ^9.0.2
- `mongodb`: ^6.12.0
- `mongoose`: ^8.8.1
- `socket.io`: ^4.8.1

## Dev Dependencies
- `nodemon`: ^3.1.7

## Endpoints

### Auth Routes
- `POST /users/register`: Register a new user.
- `POST /users/login`: Login a user.
- `POST /users/logout`: Logout a user.
- `PUT /users/update-profile`: Update user profile (protected route).
- `GET /users/check`: Check user authentication status (protected route).

### Message Routes
- `GET /messages/users`: Get users for sidebar (protected route).
- `GET /messages/:id`: Get messages for a specific user (protected route).
- `POST /messages/send/:id`: Send a message to a specific user (protected route).

### Task Routes
- `GET /tasks`: Get all tasks.
- `POST /tasks`: Add a new task.

## Running the Application
1. Start the development server:
   ```sh
   npm run dev
   ```
2. Start the production server:
   ```sh
   npm start
   ```

## Seeding the Database
To seed the database with initial data, run the following command:
```sh
node src/seeds/user.seed.js
```

## License
This project is licensed under the ISC License.