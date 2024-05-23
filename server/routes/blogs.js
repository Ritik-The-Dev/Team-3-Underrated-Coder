import express from "express";
import auth from "../middleware/auth.js";
import { FetchAllBlog, addBlog } from "../controllers/blog.js";

const router = express.Router();

router.get("/fetchBlog",  FetchAllBlog);
router.post("/addBlog", auth, addBlog);

export default router;
