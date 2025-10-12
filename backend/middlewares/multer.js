// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public"); // Save files to ./public directory
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname); // Keep original file name
//   }
// });

// export const upload = multer({ storage });
// 

import multer from "multer";
import fs from "fs";
import path from "path";

// ensure ./public exists
const uploadDir = path.resolve('./public');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

export const upload = multer({ storage });
