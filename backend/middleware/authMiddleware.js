const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;

  // Check if the Authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Extract the token after "Bearer"

      // Decode the token and verify it
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the authenticated user to the request object (exclude password)
      req.user = await User.findById(decoded.id).select("-password");

      next(); // Proceed to the next middleware or controller
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
