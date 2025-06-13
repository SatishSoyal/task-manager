COLLABARATIVE TASK MANAGER

1. A full-stack collaborative task manager built with the MERN stack.
2. It allows teams to manage tasks by creating, assigning, and updating them collaboratively with role-based access control.

FEATURES

1. User Registration & Authentication (JWT-based)
2. Role-based Access (Admin | Teammate)
3. Task Creation by Admins
4. Task Assignment to Teammates
5. Status Updates (todo, in-progress, done)
6. View All Related Tasks in Profile
7. Logout functionality

TECH STACK

Frontend            React.js
Backend             Node.js, Express.js
Database            MongoDB, Mongoose
Auth                CORS, cookie-parser

GETTING STARTED

clone the repositary   https://github.com/SatishSoyal/task-manager

Backend Setup
1. Navigate to backend folder:  cd backend
2. Create .env file
=>  PORT=5000
    MONGODB_URI=<your-mongodb-connection-string>
    ACCESS_TOKEN_SECRET=<your-access-token-secret>
    REFRESH_TOKEN_SECRET=<your-refresh-token-secret>
    ACCESS_TOKEN_EXPIRY=15m
    REFRESH_TOKEN_EXPIRY=7d
3. npm run dev


Frontend Setup
1. Navigate to frontend directory: cd frontend
2. npm install
3. npm run dev


API DOCUMENTATION

1. Register
URL: POST /api/v1/auth/register

Body:{
     "username": "john",
     "email": "john@example.com",
     "password": "password123",
     "role": "admin"
}

2. Login
URL: POST /api/v1/auth/login

Body: {
      "email": "john@example.com",
      "password": "password123"
     }














