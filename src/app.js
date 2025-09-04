import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import carRoutes from "./routes/car.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads folder
// app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.use("/api/v1/uploads", express.static(path.join(__dirname, "./uploads")));

//service-routes
app.use("/api/users", userRoutes);
app.use("/api/v1/car", carRoutes);
app.use("/api/v1/booking", bookingRoutes);

// default route
app.get("/", (req, res) => {
  res.send("Car server is running...");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
