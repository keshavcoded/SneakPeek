import express from "express";
import { getTrendingmovie } from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/trending", getTrendingmovie)

export default router;