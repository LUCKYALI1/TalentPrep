import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import dotenv from 'dotenv'; // 👈 Explicitly import dotenv

dotenv.config(); // 👈 Initialize environment streams instantly

// ⚡ Debug Check Node (Optional: Initial testing ke liye check lagao)
if (!process.env.CLOUDINARY_API_KEY) {
  console.error("❌ CLOUDINARY_API_KEY missing in execution runtime!");
}

// ⚡ Cloudinary Credentials Matrix Configured
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// ⚡ Direct Memory Storage Strategy
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('[EXC_ERR]: Unsupported file streaming format. Images only.'), false);
  }
};

const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } 
});

export { cloudinary, upload };