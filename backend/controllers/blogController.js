const Blog = require("../models/blogModel");

// Get all blogs
const getBlogs = async (req, res) => {
  const { category } = req.query;

  try {
    // Build the query dynamically based on the category
    const query = category && category !== "All" ? { category } : {};

    const blogs = await Blog.find(query).populate("user", "username email");

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
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
    const updatedBlog = await Blog.findById(req.params.id)
      .populate("user", "username email") // Populate blog author
      .populate("comments.user", "username email"); // Populate users of comments

    res.status(200).json(updatedBlog);
    //res.status(201).json(blog);
  } else {
    res.status(404).json({ message: "Blog not found" });
  }
};
const updateComment = async (req, res) => {
  const { id, commentId } = req.params;
  const { text } = req.body;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const comment = blog.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if the logged-in user is the owner of the comment
    if (comment.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this comment" });
    }

    // Update the comment text
    comment.text = text;
    await blog.save();

    // Re-populate the user field in comments
    const updatedBlog = await Blog.findById(id)
      .populate("user", "username email") // Populate blog author
      .populate("comments.user", "username email"); // Populate users of comments

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: "Error updating comment", error });
  }
};

const deleteComment = async (req, res) => {
  const { id, commentId } = req.params;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const comment = blog.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if the logged-in user is the owner of the comment
    if (comment.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this comment" });
    }

    // Remove the comment using the pull method
    blog.comments = blog.comments.filter((c) => c._id.toString() !== commentId);

    await blog.save();

    // Re-populate the user field in comments
    const updatedBlog = await Blog.findById(id)
      .populate("user", "username email") // Populate blog author
      .populate("comments.user", "username email"); // Populate users of comments

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error });
  }
};
const getMyBlogs = async (req, res) => {
  try {
    console.log(req.user._id);
    const blogs = await Blog.find({ user: req.user._id }).populate(
      "user",
      "username email"
    );
    res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching your blogs", error });
  }
};

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  addCommentToBlog,
  updateComment,
  deleteComment,
  getMyBlogs,
};
