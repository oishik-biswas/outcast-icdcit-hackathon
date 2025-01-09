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
# API Endpoints Documentation

## Auth Routes

### **POST /users/register:** Register a new user.
#### Request Body:
```json
{
  "email": "user@example.com",
  "fullName": "John Doe",
  "password": "password123"
}
```
#### Response:
```json
{
  "_id": "60d0fe4f5311236168a109ca",
  "email": "user@example.com",
  "fullName": "John Doe",
  "profilePic": "",
  "createdAt": "2023-10-01T12:34:56.789Z",
  "updatedAt": "2023-10-01T12:34:56.789Z"
}
```

### **POST /users/login:** Login a user.
#### Request Body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
#### Response:
```json
{
  "token": "jwt-token",
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "email": "user@example.com",
    "fullName": "John Doe",
    "profilePic": ""
  }
}
```

### **POST /users/logout:** Logout a user.
#### Response:
```json
{
  "message": "User logged out successfully"
}
```

### **PUT /users/update-profile:** Update user profile (protected route).
#### Request Body:
```json
{
  "fullName": "John Doe Updated",
  "profilePic": "new-profile-pic-url"
}
```
#### Response:
```json
{
  "_id": "60d0fe4f5311236168a109ca",
  "email": "user@example.com",
  "fullName": "John Doe Updated",
  "profilePic": "new-profile-pic-url",
  "createdAt": "2023-10-01T12:34:56.789Z",
  "updatedAt": "2023-10-01T12:45:56.789Z"
}
```

### **GET /users/check:** Check user authentication status (protected route).
#### Response:
```json
{
  "authenticated": true,
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "email": "user@example.com",
    "fullName": "John Doe",
    "profilePic": ""
  }
}
```

---

## Message Routes

### **GET /messages/users:** Get users for sidebar (protected route).
#### Response:
```json
[
  {
    "_id": "60d0fe4f5311236168a109ca",
    "email": "user@example.com",
    "fullName": "John Doe",
    "profilePic": ""
  },
  {
    "_id": "60d0fe4f5311236168a109cb",
    "email": "user2@example.com",
    "fullName": "Jane Doe",
    "profilePic": ""
  }
]
```

### **GET /messages/:id:** Get messages for a specific user (protected route).
#### Response:
```json
[
  {
    "_id": "60d0fe4f5311236168a109cc",
    "senderId": "60d0fe4f5311236168a109ca",
    "receiverId": "60d0fe4f5311236168a109cb",
    "text": "Hello!",
    "image": "",
    "createdAt": "2023-10-01T12:34:56.789Z",
    "updatedAt": "2023-10-01T12:34:56.789Z"
  },
  {
    "_id": "60d0fe4f5311236168a109cd",
    "senderId": "60d0fe4f5311236168a109cb",
    "receiverId": "60d0fe4f5311236168a109ca",
    "text": "Hi there!",
    "image": "",
    "createdAt": "2023-10-01T12:35:56.789Z",
    "updatedAt": "2023-10-01T12:35:56.789Z"
  }
]
```

### **POST /messages/send/:id:** Send a message to a specific user (protected route).
#### Request Body:
```json
{
  "text": "Hello!",
  "image": ""
}
```
#### Response:
```json
{
  "_id": "60d0fe4f5311236168a109cc",
  "senderId": "60d0fe4f5311236168a109ca",
  "receiverId": "60d0fe4f5311236168a109cb",
  "text": "Hello!",
  "image": "",
  "createdAt": "2023-10-01T12:34:56.789Z",
  "updatedAt": "2023-10-01T12:34:56.789Z"
}
```

---

## Task Routes

### **GET /tasks/:userId:** Get all tasks for a user (protected route).
#### Response:
```json
[
  {
    "_id": "60d0fe4f5311236168a109ce",
    "userId": "60d0fe4f5311236168a109ca",
    "name": "Task 1",
    "completed": false,
    "createdAt": "2023-10-01T12:34:56.789Z",
    "updatedAt": "2023-10-01T12:34:56.789Z"
  },
  {
    "_id": "60d0fe4f5311236168a109cf",
    "userId": "60d0fe4f5311236168a109ca",
    "name": "Task 2",
    "completed": true,
    "createdAt": "2023-10-01T12:35:56.789Z",
    "updatedAt": "2023-10-01T12:35:56.789Z"
  }
]
```

### **POST /tasks/:userId:** Add a new task (protected route).
#### Request Body:
```json
{
  "name": "New Task",
  "completed": false
}
```
#### Response:
```json
{
  "_id": "60d0fe4f5311236168a109d0",
  "userId": "60d0fe4f5311236168a109ca",
  "name": "New Task",
  "completed": false,
  "createdAt": "2023-10-01T12:36:56.789Z",
  "updatedAt": "2023-10-01T12:36:56.789Z"
}
```


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
