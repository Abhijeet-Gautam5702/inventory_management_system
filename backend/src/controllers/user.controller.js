import express from "express";
import asyncHandler from "../utils/asyncHandler.utils.js";
import User from "../models/user.model.js";
import CustomApiResponse from "../utils/customApiResponse.utils.js";
import CustomApiError from "../utils/customApiError.utils.js";
import { INITIAL_ERROR_MESSAGES } from "../../constants.js";

// Healthcheck controller
const healthCheck = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  res.status(200).json({ email, password });
});

// Register User
const registerUser = asyncHandler(async (req, res) => {
  // Get data from the client using body
  const {fullname, email, password } = req.body;

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

export { healthCheck, registerUser };
