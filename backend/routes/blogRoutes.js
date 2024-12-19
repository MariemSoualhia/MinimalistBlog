const express = require("express");
const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  addCommentToBlog,
  updateComment,
  deleteComment,
  getMyBlogs,
} = require("../controllers/blogController");
const { protect } = require("../middleware/authMiddleware"); // Import protect middleware

const router = express.Router();

router.get("/", getBlogs);
router.get("/myblogs", protect, getMyBlogs);
router.get("/:id", getBlogById);
router.post("/", protect, createBlog); // Only authenticated users can create blogs
router.put("/:id", protect, updateBlog); // Only authenticated users can update blogs
router.delete("/:id", protect, deleteBlog); // Only authenticated users can delete blogs
router.post("/:id/comments", protect, addCommentToBlog); // Only authenticated users can add comments
router.put("/:id/comments/:commentId", protect, updateComment);
router.delete("/:id/comments/:commentId", protect, deleteComment);

module.exports = router;
