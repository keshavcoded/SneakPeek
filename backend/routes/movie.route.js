import express from "express";
import {
  getMoviebyCategory,
  getMovieDetails,
  getMovieTrailers,
  getSimilarMovies,
  getTrendingmovie,
} from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/trending", getTrendingmovie);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getSimilarMovies);
router.get("/:category", getMoviebyCategory);

export default router;
