import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// CORS configuration for frontend access
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Import Routes
import authRouter from "./routes/user.routes.js";
import taskRouter from "./routes/task.routes.js";

// Declare Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", taskRouter);

export { app };
