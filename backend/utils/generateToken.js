import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "7d" });

  res.cookie("jwt-token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, //prevent XSS attacks crossite scripting attacks , make it not acessible by JS script
    sameSite: "strict", //CSRF attacks croosiste request forgery
    secure: ENV_VARS.NODE_ENV != "dev",
  });

  return token;
};
