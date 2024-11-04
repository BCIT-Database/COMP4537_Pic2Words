import dotenv from "dotenv";
dotenv.config();
import connectCloudStorage from "./config/cloudinary.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import homeRoutes from "./routes/homeRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Connect to cloud storage
connectCloudStorage();

const app = express();

const allowedOrigins =
  process.env.NODE_ENV === "development"
    ? ["http://localhost:5173"]
    : [
        "https://comp4537-pic2words-1.onrender.com",
        "https://icy-stone-047aaa510.5.azurestaticapps.net",
      ];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Set up routes
app.use("/api", homeRoutes); // Set API path to '/api'
// app.use("/api", uploadRoutes); // Commented out to avoid repetition
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running....");
});

const port = process.env.PORT || 8080;
app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
