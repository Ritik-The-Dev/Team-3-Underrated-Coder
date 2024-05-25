import cloudinary from "cloudinary";
const cloudinaryInstance = cloudinary.v2;
import dotenv from "dotenv";
dotenv.config();

export const cloudinaryConnect = async () => {
  try {
     cloudinaryInstance.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  } catch (err) {
    console.log("Error:", err);
  }
};
