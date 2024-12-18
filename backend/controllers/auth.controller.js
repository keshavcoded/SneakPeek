import zod from "zod";
import bcryptjs from "bcryptjs";
import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

const signupBody = zod.object({
  email: zod.string().email("Invalid Email").min(1, "Email is required"),
  password: zod
    .string()
    .min(6, "Password must be atleast 6 characters")
    .min(1, "Password is required"),
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

    generateTokenAndSetCookie(newUser._id,res)
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

export async function signin(req, res) {
  res.send("Sign in route");
}

export async function signout(req, res) {
  res.send("Sign out route");
}
