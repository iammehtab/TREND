import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import orderRoutes from "./routes.js";

const app = express();

// For __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Optional if you want to serve all static files

// Routes
app.use("/api", orderRoutes);

// Home page route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
