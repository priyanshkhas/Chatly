import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const uploadOnCloudinary = async (filePath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'profile-images', // optional: organizes in Cloudinary
    });
    return result.secure_url;
  } catch (err) {
    console.error("[uploadOnCloudinary] Cloudinary upload failed:", err);
    throw err; // re-throw to handle it in controller
  } finally {
    fs.unlinkSync(filePath); // Always clean up local file
  }
};


export default uploadOnCloudinary;
