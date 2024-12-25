import express from "express";
import { deleteSearchHistory, getSearchHistory, searchMovies, searchPerson, searchTV } from "../controllers/search.controller.js";

const router = express.Router();

router.get("/person/:query", searchPerson);
router.get("/movie/:query", searchMovies);
router.get("/tv/:query", searchTV);
router.get("/history", getSearchHistory);
router.delete("/history/:id", deleteSearchHistory);

export default router; 