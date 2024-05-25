import cloudinary from "cloudinary";
const cloudinaryInstance = cloudinary.v2;

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

    const result = await cloudinaryInstance.uploader.upload(file.tempFilePath, {
      folder: "user-project",
    });

    res.status(200).json({
      success: true,
      message: "Image Uploaded Successfully",
      fileUrl: result.secure_url,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: "Something Went Wrong",
    });
  }
};
