import express from "express";
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import searchRoutes from "./routes/search.route.js";
import tvRoutes from "./routes/tv.route.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";
import path from "path";
const app = express();

app.use(express.json()); //allows to parse req.body
app.use(cookieParser());

const PORT = ENV_VARS.PORT;
const __dirname = path.resolve();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", authMiddleware, movieRoutes);
app.use("/api/v1/tv", authMiddleware, tvRoutes);
app.use("/api/v1/search", authMiddleware, searchRoutes);

if (ENV_VARS.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
