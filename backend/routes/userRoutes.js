const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  updateProfilePicture,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Set the uploads directory
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get the file extension
    cb(null, `${Date.now()}${ext}`); // Set a unique filename with the extension
  },
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Multer upload instance
const upload = multer({ storage, fileFilter });

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.post(
  "/profile/picture",
  protect,
  upload.single("profilePicture"),
  updateProfilePicture
);

module.exports = router;
