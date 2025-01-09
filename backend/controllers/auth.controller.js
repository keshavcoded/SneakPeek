import zod from "zod";
import bcryptjs from "bcryptjs";
import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

const signupBody = zod.object({
  email: zod.string().min(1, "Email is required").email("Invalid Email"),
  password: zod
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  username: zod.string().min(1, "Username is required"),
});

export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;
    const result = signupBody.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const existingUserbyEmail = await User.findOne({ email: email });
    if (existingUserbyEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const existingUserbyUsername = await User.findOne({ username: username });
    if (existingUserbyUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    const salt = await bcryptjs.genSalt(10);

    const hashedPassword = await bcryptjs.hash(password, salt);

    const PROFILE_PICS = ["/profile1.png", "/profile2.png", "/profile3.png"];

    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
      image: image,
    });

    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();
    return res.status(201).json({
      success: true,
      user: { ...newUser._doc, password: "" },
    });
  } catch (e) {
    console.log("Error in signup controller", e.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

const siginBody = zod.object({
  email: zod.string().email("Invalid email").min(1, "Email is required"),
  password: zod.string().min(1, "Password is required"),
});

export async function signin(req, res) {
  try {
    const { email, password } = req.body;
    const result = siginBody.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return res.status(400).json({ success: false, message: errors });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }

    const passwordCheck = await bcryptjs.compare(password, user.password);

    if (!passwordCheck) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    generateTokenAndSetCookie(user._id, res);

    return res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: "",
      },
      message: "Logged in",
    });
  } catch (error) {
    console.log("Error in signin controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export async function signout(req, res) {
  try {
    res.clearCookie("jwt-token");
    res.status(200).json({ success: true, message: "Logged out succesfully" });
  } catch (error) {
    console.log("Error in singout controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
