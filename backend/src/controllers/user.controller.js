import asyncHandler from "../utils/asyncHandler.utils.js";
import User from "../models/user.model.js";
import CustomApiResponse from "../utils/customApiResponse.utils.js";
import CustomApiError from "../utils/customApiError.utils.js";
import { INITIAL_ERROR_MESSAGES } from "../../constants.js";

const cookieOptions = {
  httpOnly: true,
  secure: false, // Until development
  // SameSite:"None",
  // domain:"localhost",
  // path:"/"
};

// Healthcheck controller
const healthCheck = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  res.status(200).json({ email, password });
});

// Register User
const registerUser = asyncHandler(async (req, res) => {
  // Get data from the client using body
  const { fullname, email, password } = req.body;

  // Validate whether any of the datafields is empty or invalid
  if (
    [email, password, fullname].some(
      (field) => !field || (field && field.trim() === "")
    )
  ) {
    throw new CustomApiError(
      400,
      `${INITIAL_ERROR_MESSAGES.USERS.REGISTER_USER} | One or more required fields is empty`
    );
  }

  // Check if the user already exists in database using the email or username
  const isUserExists = await User.findOne({
    email,
  });
  if (isUserExists) {
    throw new CustomApiError(
      409,
      `${INITIAL_ERROR_MESSAGES.USERS.REGISTER_USER} | A user with same email already exists`
    );
  }

  // Create the user from the recieved details
  await User.create({
    password,
    fullname,
    email,
  });

  // Check if the user has been created successfully or not
  // Create a user instance without password and refreshToken
  const createdUser = await User.findOne({ email }).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new CustomApiError(
      500,
      `${INITIAL_ERROR_MESSAGES.USERS.REGISTER_USER} | Some unknown error occured at our end | User could not be created in our database`
    );
  }

  // Send response to the client
  res
    .status(200)
    .json(
      new CustomApiResponse(200, "User Registration Successful", createdUser)
    );
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  // Get data from the client using req.body
  const { email, password } = req.body;
  // Check if all the required data is provided
  if (
    [email, password].some((field) => !field || (field && field.trim() == ""))
  ) {
    throw new CustomApiError(
      422,
      `${INITIAL_ERROR_MESSAGES.USERS.LOGIN_USER} | Some required fields are not provided`
    );
  }

  // Check if the user exists in the database
  const user = await User.findOne({
    email: email.trim(),
  });
  if (!user) {
    throw new CustomApiError(
      404,
      `${INITIAL_ERROR_MESSAGES.USERS.LOGIN_USER} | User not found in the database`
    );
  }

  // Validate the password
  const isPasswordCorrect = await user.validatePassword(password.trim());
  if (!isPasswordCorrect) {
    throw new CustomApiError(
      400,
      `${INITIAL_ERROR_MESSAGES.USERS.LOGIN_USER} | Incorrect password`
    );
  }

  // Create a refresh token and an access token for the user
  const accessToken = user.accessTokenGenerator();
  const refreshToken = user.refreshTokenGenerator();

  // Store the refresh token in the database
  user.refreshToken = refreshToken;
  await user.save();

  // Get the instance of the created user
  const createdUser = await User.findOne({ email: email.trim() }).select(
    "-refreshToken -password"
  );

  // Send success response to the client & cookies to the browser
  res
    .status(200)
    .cookie("accessToken", accessToken.toString(), cookieOptions)
    .cookie("refreshToken", refreshToken.toString(), cookieOptions)
    .json(new CustomApiResponse(200, "User login successful", createdUser));
});

// Logout User
const logoutUser = asyncHandler(async (req, res) => {
  // Auth middleware: Verify whether the user is authorized to hit the route (The user must be logged-in)

  // Clear the refreshToken from the user in the database
  const user = await User.findById(req.user._id);
  user.refreshToken = "";
  await user.save();
  if (user.refreshToken) {
    throw new CustomApiError(
      500,
      `${INITIAL_ERROR_MESSAGES.USERS.LOGOUT_USER} | Some unknown error occured at our end | Refresh Token could not be cleared`
    );
  }

  // Remove the cookies from the browser
  // Send success response to the client
  res
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .status(200)
    .json(new CustomApiResponse(200, "User logged out successfully"));
});

export { healthCheck, registerUser, loginUser, logoutUser };
