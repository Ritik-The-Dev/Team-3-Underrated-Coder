import express from "express";

import { login, signup, sendSignUpOtp,sendForgetOtp, changePassword,getUserDetails } from "../controllers/auth.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/getUserDetails",auth,getUserDetails);
router.post("/sendForgetOtp", sendForgetOtp);
router.post("/sendSignUpOtp", sendSignUpOtp);
router.post("/changePassword", changePassword);

export default router;
 