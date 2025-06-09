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
  }
});
