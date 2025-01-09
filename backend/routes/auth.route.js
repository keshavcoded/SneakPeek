import express from "express";
import { authUserCheck, signin, signout, signup } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/signout", signout);

router.get("/check", authMiddleware, authUserCheck);

export default router;

