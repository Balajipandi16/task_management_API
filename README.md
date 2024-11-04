
---

# Task Management API

A RESTful API for task management with real-time notifications, user authentication (JWT and Google OAuth), and role-based access control. Built with Node.js, Express.js, MongoDB, and WebSocket (Socket.IO).

## Features

- **User Registration and Login**: Secure JWT authentication and Google OAuth for social login.
- **Task Management**: CRUD operations for tasks, including assignment, prioritization, and status tracking.
- **Real-time Notifications**: Socket.IO for real-time updates on task changes.
- **Role-based Access Control**: Different roles for users with permissions based on roles.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Real-time**: Socket.IO
- **Authentication**: JWT, Google OAuth2 with Passport.js

---

## Table of Contents

- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Socket.IO Events](#socketio-events)


---

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- **Node.js**: Install from [Node.js website](https://nodejs.org/).
- **MongoDB**: Install and start MongoDB locally, or use MongoDB Atlas for cloud storage.

### Environment Variables

Create a `.env` file in the root of the project and add the following environment variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
PORT=5000
```

- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for JWT.
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: OAuth credentials from Google API Console.
- `PORT`: Port for the server to run on (default is `5000`).

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/task-management-api.git
   cd task-management-api
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the server**:
   ```bash
   node server.js
   ```

4. **Access the API** at `http://localhost:5000`.

---

## API Endpoints

### Authentication Routes

| Route                  | Method | Description                           |
|------------------------|--------|---------------------------------------|
| `/auth/register`       | POST   | Register a new user                  |
| `/auth/login`          | POST   | Login and receive a JWT              |
| `/auth/google`         | GET    | Login with Google                    |
| `/auth/google/callback`| GET    | Google OAuth callback                |

#### Example: User Registration
- **URL**: `/auth/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully"
  }
  ```

### Task Routes (Protected by JWT)

| Route          | Method | Description                           |
|----------------|--------|---------------------------------------|
| `/tasks`       | POST   | Create a new task                    |
| `/tasks`       | GET    | Retrieve all tasks                   |

#### Example: Create Task
- **URL**: `/tasks`
- **Method**: `POST`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <your_jwt_token>"
  }
  ```
- **Request Body**:
  ```json
  {
    "title": "New Task",
    "description": "Task details",
    "priority": "High",
    "dueDate": "2024-12-31T23:59:59Z"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "task_id",
    "title": "New Task",
    "description": "Task details",
    "priority": "High",
    "status": "Pending",
    "dueDate": "2024-12-31T23:59:59Z",
    "assignedTo": "user_id"
  }
  ```

---

## Socket.IO Events

Real-time notifications allow connected clients to receive task updates instantly.

### Task Events

| Event         | Description                                       |
|---------------|---------------------------------------------------|
| `taskCreated` | Emitted when a new task is created                |

#### Example: Listening for `taskCreated` in the client

```javascript
const socket = io('http://localhost:5000');

socket.on('taskCreated', (task) => {
  console.log('New Task Created:', task);
});
```

---

## Project Structure

```
- server.js                 // Entry point of the application
- config/
  - db.js                   // Database configuration
  - passport.js             // Passport Google OAuth configuration
- models/
  - User.js                 // User schema
  - Task.js                 // Task schema
- middleware/
  - auth.js                 // JWT verification middleware
- routes/
  - authRoutes.js           // Authentication routes
  - taskRoutes.js           // Task routes
- .env                      // Environment variables
```

