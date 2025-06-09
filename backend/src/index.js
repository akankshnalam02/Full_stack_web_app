import express from "express";
import authRouters from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { app, io, server } from "../src/lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// CORS config: allow localhost and any Vercel frontend origin dynamically
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      // Allow requests with no origin (Postman, curl)
      return callback(null, true);
    }

    // Allow localhost for dev
    if (origin === "http://localhost:5173") {
      return callback(null, true);
    }

    // Allow any Vercel preview or production deployment
    if (/^https?:\/\/[\w.-]+\.vercel\.app$/.test(origin)) {
      return callback(null, true);
    }

    // Reject other origins
    return callback(new Error("CORS policy: This origin is not allowed."), false);
  },
  credentials: true,  // allow cookies and auth headers
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // handle preflight requests

app.use(cookieParser());
app.use(express.json());

// API routes
app.use("/api/auth", authRouters);
app.use("/api/messages", messageRoutes);

// Start server and DB connection
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
