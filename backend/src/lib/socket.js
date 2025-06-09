import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  "https://chat-app-ten-mu-77.vercel.app"
];

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else if (/^https?:\/\/[\w.-]+\.vercel\.app\/?$/.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy: This origin is not allowed."), false);
      }
    },
    credentials: true,
  },
});

const userSocketMap = {}; // { userId: socketId }

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    if (userId) {
      delete userSocketMap[userId];
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// ✅ Export needed functions and instances
export function getReceverSocketId(recevierId) {
  return userSocketMap[recevierId];
}

export { io, app, server };
