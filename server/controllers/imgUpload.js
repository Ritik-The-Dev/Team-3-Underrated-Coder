import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

export const uploadImageController = async (req, res) => {
  try {
    const file = req.files.image;

    if (!file) {
      return res.status(400).json({
        message: "Image is Required",
      });
    }

    // Check file size (2 MB = 2 * 1024 * 1024 bytes)
    if (file.size > 2 * 1024 * 1024) {
      return res.status(400).json({
        message: "Image size exceeds 2 MB",
      });
    }

    const allowedImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/bmp",
      "image/webp",
      "image/svg+xml",
      "image/tiff",
      "image/vnd.microsoft.icon",
      "image/x-icon",
      "image/vnd.wap.wbmp",
      "image/apng",
      "image/avif",
      // Add more image types here if needed
    ];

    if (!allowedImageTypes.includes(file.mimetype)) {
      return res.status(400).json({
        message:
          "Only JPEG, PNG, GIF, BMP, WEBP, TIFF, ICON, X-ICON, WBMP, APNG, AVIF, and SVG images are allowed",
      });
    }

    // Resolve __dirname using fileURLToPath and import.meta.url
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Set path where to save the file
    const fileExtension = path.extname(file.name).toLowerCase();
    const fileName = `${Date.now()}${fileExtension}`;
    const filePath = path.join(__dirname, "../uploads/images", fileName);

    // Ensure the directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Move the file to the desired location
    await file.mv(filePath);

    // Construct the file URL (assuming the file is served statically from 'uploads/images')
    const fileUrl = `${req.protocol}://${req.get(
      "host"
    )}/uploads/images/${fileName}`;

    res.status(200).json({
      success: true,
      message: "Image Uploaded Successfully",
      fileUrl: fileUrl,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: "Something Went Wrong",
    });
  }
};
