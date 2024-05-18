import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users.js";
import connectDB from "./connectMongoDb.js";

dotenv.config();
connectDB();

const app = express();
app.use(cookieParser());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());
app.use("/user", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT,'0.0.0.0',() => {
  console.log(`server running on port ${PORT}`);
});
app.get("/",(req,res)=>{
  res.send("This is Team 3 Backend API")
})