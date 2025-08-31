import express from "express";
import dotenv from "dotenv";//OR we can also do this= import "dotenv/config";
import cookieparser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import { connectDB } from "./lib/db.js";
dotenv.config();

const app= express();
const PORT = process.env.PORT //Port no came from .env file

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true //allow frontend to send cookies
}));
app.use(express.json());
app.use(cookieparser());

// app.get("/", (req, res) => {
//   res.send("Server is up and running 🚀");
// });

app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/chat",chatRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})