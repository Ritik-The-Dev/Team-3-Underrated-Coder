import jwt from "jsonwebtoken";
import User from "../models/auth.js";

const auth = async (req, res, next) => {
  try {
    let token;
    // Check if authorization header is present and starts with "Bearer"
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // Extract token from the authorization header
        token = req.headers.authorization.split(" ")[1];

        // Verify the token and decode its payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Find user by decoded ID and exclude password field
        req.user = await User.findById(decoded.id);

        next(); // Proceed to the next middleware or route handler
      } catch (error) {
        // Handle token verification errors
        res.status(401).json({msg:'Not Authorized',error}); // Unauthorized status code
      }
    }
    // If no token is found in the authorization header
    if (!token) {
      res.status(401).json({msg:'Not Authorized'});// Throw error
    }
  } catch (err) {
    res.status(401).json({msg:'Not Authorized'}); // Throw error
  }
};

export default auth;
