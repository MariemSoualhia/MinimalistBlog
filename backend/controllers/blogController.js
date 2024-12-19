const Blog = require("../models/blogModel");

// Get all blogs
const getBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
};

// Get a single blog by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("user", "username email") // Populate the blog's author
      .populate("comments.user", "username email"); // Populate the user for each comment

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog details", error });
  }
};

// Create a new blog
// Create a new blog
const createBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    // Attach the authenticated user's ID
    const blog = new Blog({
      title,
      content,
      category,
      user: req.user._id, // User ID from the token
    });

    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: "Error creating blog", error });
  }
};

// Update a blog by ID
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(400).json({ message: "Error updating blog", error });
  }
};

// Delete a blog by ID
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting blog", error });
  }
};
const addCommentToBlog = async (req, res) => {
  const { text } = req.body;

  const blog = await Blog.findById(req.params.id);
  if (blog) {
    const comment = {
      user: req.user._id,
      text,
    };
    blog.comments.push(comment);
    await blog.save();
    res.status(201).json(blog);
  } else {
    res.status(404).json({ message: "Blog not found" });
  }
};

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  addCommentToBlog,
};
