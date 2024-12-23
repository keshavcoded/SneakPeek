import express from "express";
import {
  getDetailsTV,
  getSimilarTV,
  getTrailersTV,
  getTrendingTV,
  getTvbyCategory,
} from "../controllers/tv.controller.js";

const router = express.Router();

router.get("/trending", getTrendingTV);
router.get("/:id/trailers", getTrailersTV);
router.get("/:id/details", getDetailsTV);
router.get("/:id/similar", getSimilarTV);
router.get("/:category", getTvbyCategory);

export default router;
