import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users.js";
import blogRoutes from "./routes/blogs.js";
import connectDB from "./connectMongoDb.js";
import fileUpload from "express-fileupload";
import path from "path";
import { cloudinaryConnect } from "./cloudinary.js";
import { fileURLToPath } from "url";

dotenv.config();
connectDB();

const app = express();
app.use(cookieParser());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Resolve __dirname using fileURLToPath and import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serve static files
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(cors());
app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

cloudinaryConnect();

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`server running on port ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("This is Team 3 Backend API");
});
