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

const PORT = process.env.PORT;

const __dirname = path.resolve();
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://chat-app-61fhwdi9f-akankshs-projects-65c835d4.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin like curl or mobile apps
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy: This origin is not allowed."));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use("/api/auth", authRouters);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("server is running on port " + PORT);
  connectDB();
});
