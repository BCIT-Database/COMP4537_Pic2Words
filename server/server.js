import dotenv from "dotenv";
dotenv.config();
import connectCloudStorage from "./config/cloudinary.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import homeRoutes from "./routes/homeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import axios from "axios";

import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "../swaggerConfig.js";
import swaggerJsdoc from "swagger-jsdoc";

// Connect to cloud storage
connectCloudStorage();

const app = express();

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const getPythonSwagger = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8080/swagger.json");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Python Swagger JSON:", error.message);
    return null;
  }
};

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS
  : [];

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

// Serve Swagger UI for Node.js
app.use(
  "/doc",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

app.get("/", (req, res) => {
  res.send("API is running....");
});

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
