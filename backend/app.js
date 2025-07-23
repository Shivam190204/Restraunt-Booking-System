import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from './routes/reservationRoute.js';

const app = express();
dotenv.config({ path: './config/config.env' });

// ✅ CORS Configuration
app.use(cors({
  origin: process.env.FRONTEND_URL, // Must be defined in .env file
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/reservation', reservationRouter);

// DB Connection
dbConnection();

// Error Handler
app.use(errorMiddleware);

export default app;
