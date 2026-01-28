import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

// Generate Tokens & Save Refresh Token to DB
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    // 👇 THIS IS THE NEW PART
    console.log("Detailed Error Log:", error); // <--- This will print the real reason in your terminal
    throw new Error(
      "Something went wrong while generating refresh and access token"
    );
  }
};

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if ([fullName, email, password].some((field) => field?.trim() === "")) {
    return res
      .status(400)
      .json({ error: true, message: "All fields are required" });
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    return res
      .status(409)
      .json({ error: true, message: "User with email already exists" });
  }

  const user = await User.create({ fullName, email, password });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    return res
      .status(500)
      .json({
        error: true,
        message: "Something went wrong while registering the user",
      });
  }

  return res.status(201).json({
    error: false,
    user: createdUser,
    message: "User registered Successfully",
  });
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: true, message: "Email and password is required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ error: true, message: "User does not exist" });
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    return res
      .status(401)
      .json({ error: true, message: "Invalid user credentials" });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  // Security: Send tokens in HTTP-Only Cookies
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      error: false,
      user: { fullName: user.fullName, email: user.email },
      accessToken,
      message: "User logged In Successfully",
    });
});

// Get Current User
const getUser = asyncHandler(async (req, res) => {
  const { user } = req;
  const isUser = await User.findOne({ _id: user._id });

  if (!isUser) {
    return res.sendStatus(401);
  }

  return res.json({
    user: {
      fullName: isUser.fullName,
      email: isUser.email,
      _id: isUser._id,
      createdOn: isUser.createdAt,
    },
    message: "",
  });
});

export { registerUser, loginUser, getUser };