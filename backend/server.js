const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize the app
const app = express();
app.use(cors());
// Middleware
app.use(express.json());

// Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);
// Serve static profile images
app.get("/static-images/:filename", (req, res) => {
  const filename = req.params.filename;
  const resolvedFilePath = path.join(__dirname, "uploads", filename);

  fs.access(resolvedFilePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`File not found: ${resolvedFilePath}`);
      return res.status(404).send("Image not found");
    }
    res.sendFile(resolvedFilePath);
  });
});
// Error Handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
