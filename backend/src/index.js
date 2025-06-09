import  express  from "express";
import authRouters from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import {app,io,server} from "../src/lib/socket.js";
dotenv.config()



const PORT =process.env.PORT;

const __dirname = path.resolve();
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173", // Update with frontend URL
    credentials: true,
}));
app.use(express.json());
app.use("/api/auth",authRouters);
app.use("/api/messages",messageRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    });
}

server.listen(PORT,()=>{
    console.log("server is running on port "+PORT)
    connectDB();
});