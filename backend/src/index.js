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

const PORT = process.env.PORT || 5000;   // fallback for local dev
const __dirname = path.resolve();

// ────────────────────────────────────────────────────────────
//                 CORS CONFIGURATION
// ────────────────────────────────────────────────────────────
const allowedOrigins = [
  "http://localhost:5173",
  "https://chat-app-ten-mu-77.vercel.app"
];

const corsOptions = {
  origin: allowedOrigins,   // Express-CORS can take an array directly
  credentials: true         // tells browser to expose/set cookies
};

app.use(cors(corsOptions));
// handle pre-flight requests explicitly (optional but safe)
app.options("*", cors(corsOptions));
// ────────────────────────────────────────────────────────────

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouters);
app.use("/api/messages", messageRoutes);

// ───────────────  No static-frontend serving  ───────────────

// start server & DB
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
