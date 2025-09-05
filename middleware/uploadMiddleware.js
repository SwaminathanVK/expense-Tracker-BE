import multer from 'multer';
import path from 'path'

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // ✅ make sure this folder exists in project root
  },
  filename: function (req, file, cb) {
    // Safer: use Date.now + extension only (avoid original name for security)
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."),
      false
    );
  }
};

// Final upload middleware
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // ✅ max 5MB
});

export default upload;
