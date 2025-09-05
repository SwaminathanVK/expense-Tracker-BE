import express from 'express';
import {
  registerUser,
  loginUser,
  getUserInfo,
} from "../controller/authController.js";
import  protect  from "../middleware/authMiddleware.js";
// import  upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// 🔑 Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", protect, getUserInfo);

// 🔑 Image upload route
// router.post("/upload-image", upload.single("image"), (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     // Construct full image URL
//     const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

//     return res.status(200).json({ imageUrl });
//   } catch (err) {
//     console.error("Image upload error:", err);
//     return res.status(500).json({ message: "Server error while uploading image" });
//   }
// });

export default router;
