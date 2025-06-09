import express from "express";
import authRouters from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, io, server } from "./lib/socket.js";  // fixed path

dotenv.config();

const PORT = process.env.PORT || 5000;

// CORS config: allow localhost and any Vercel frontend origin dynamically
const corsOptions = {
  origin: (origin, callback) => {
    console.log("CORS origin:", origin);

    const allowedOrigins = [
      "http://localhost:5173",
      "https://chat-app-ten-mu-77.vercel.app",
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    if (/^https?:\/\/[\w.-]+\.vercel\.app\/?$/.test(origin)) {
      return callback(null, true);
    }

    return callback(new Error("CORS policy: This origin is not allowed."), false);
  },
  credentials: true,
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
