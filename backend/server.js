import express from "express";
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import { authMiddleware } from "./middleware/authMiddleware.js";


const app = express();

app.use(express.json()); //allows to parse req.body


const PORT = ENV_VARS.PORT;

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", authMiddleware, movieRoutes);
app.use("/api/v1/tv", authMiddleware, tvRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});