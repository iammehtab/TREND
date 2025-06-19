import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import orderRoutes from "./routes.js"; // ✅ Correct relative path

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/api", orderRoutes); // Route: /api/order

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
