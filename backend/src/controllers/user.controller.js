import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if ([fullName, email, password].some((field) => field?.trim() === "")) {
    return res.status(400).json({ error: true, message: "All fields are required" });
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    return res.status(409).json({ error: true, message: "User with email already exists" });
  }

  const user = await User.create({ fullName, email, password });
  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    return res.status(500).json({ error: true, message: "Something went wrong while registering the user" });
  }

  return res.status(201).json({
    error: false,
    user: createdUser,
    message: "User registered Successfully",
  });
});

export { registerUser };