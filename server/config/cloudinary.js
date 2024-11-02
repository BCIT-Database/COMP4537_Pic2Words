import { v2 as cloudinary } from "cloudinary";

const connectCloudStorage = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_CLOUD_KEY,
      api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
    });

    // test connection
    console.log("Cloudinary Configuration:", {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      isConfigured: !!cloudinary.config().cloud_name,
    });

    if (!cloudinary.config().cloud_name) {
      throw new Error("Cloudinary configuration is missing");
    }

    console.log("Cloudinary configured successfully");
  } catch (error) {
    console.error("Cloudinary configuration error:", error);
    throw error;
  }
};

export { cloudinary };
export default connectCloudStorage;
