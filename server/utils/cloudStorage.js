import { cloudinary } from "../config/cloudinaryConfig.js";
import { Readable } from "stream";

export const uploadToCloudStorage = async (file) => {
  try {
    if (!file || !file.buffer) {
      console.log("Error: No file buffer found");
      throw new Error("No file provided or invalid file format");
    }

    console.log("Starting file upload to Cloudinary:", {
      originalname: file.originalname,
      mimetype: file.mimetype,
    });

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "receipts", resource_type: "auto" },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return reject(error);
          }
          console.log("Upload successful:", {
            url: result.secure_url,
            publicId: result.public_id,
            format: result.format,
            size: result.bytes,
          });
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            resourceType: result.resource_type,
            format: result.format,
            size: result.bytes,
          });
        }
      );

      // Transform the file buffer into a Readable Stream
      const stream = Readable.from(file.buffer);
      stream.pipe(uploadStream);
    });
  } catch (error) {
    console.error("Cloudinary upload error:", {
      message: error.message,
      code: error.http_code,
      name: error.name,
    });

    if (error.http_code === 401) {
      throw new Error(
        "Authentication failed with Cloudinary. Please check your credentials."
      );
    } else if (error.http_code === 404) {
      throw new Error("The requested resource was not found on Cloudinary.");
    } else {
      throw new Error(`Cloud storage upload failed: ${error.message}`);
    }
  }
};
