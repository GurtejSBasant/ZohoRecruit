// index.js
const express = require("express");
const app = express();
const jobRoutes = require("./routes/jobpostroutes");
const cors = require("cors");
const jwt = require("jsonwebtoken");
function checkTokenAge(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as Bearer token

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    console.log("jwt", process.env.jwtsecretkey);
    const secretKey = process.env.jwtsecretkey; // Use the actual secret key
    const decodedToken = jwt.verify(token, secretKey);

    const currentTime = Date.now();
    const tokenAge = currentTime - decodedToken.iat; // iat is in seconds

    // Convert iat to milliseconds and check if it's older than 1 minute (60000 ms)
    if (tokenAge > 60000) {
      return res.status(401).json({ message: "Token expired" });
    }

    console.log("Token is less than a minute old");
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
}
// Define the allowed origins
const allowedOrigins = [
  "https://newadmin.sourcebae.com",
  "https://sourcebae.com",
  "https://sourcebaeadmin.shethink.in",
  "http://localhost:3000",
];

// CORS options
const corsOptions = {
  origin: (origin, callback) => {
    // Check if the origin is in the allowed origins list or if it is undefined (for non-browser clients)
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "POST, GET, OPTIONS, PUT, DELETE", // Allow specified methods
  allowedHeaders: "Content-Type", // Allow specified headers
};

// Use CORS middleware with the specified options
app.use(cors(corsOptions));

app.use(express.json());
app.use("/zoho", jobRoutes);

const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
