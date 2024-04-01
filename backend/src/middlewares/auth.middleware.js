// Auth Middleware checks whether the user is logged-in or not.

import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.utils.js";
import jwt from "jsonwebtoken";
import CustomApiError from "../utils/customApiError.utils.js";

const authorizeUser = asyncHandler(async (req, res, next) => {
  // Get the tokens from Authorization header or the browser cookies
  const accessToken =
    req.headers?.authorization?.replace("Bearer ", "") ||
    req.cookies?.accessToken;
  if (!accessToken) {
    throw new CustomApiError(
      422,
      "Unauthorized Request | Access Token not recieved from the Authorization Header or Browser Cookies"
    );
  }

  // Decode the access token and get the details of the user
  const decodedInfoFromAccessToken = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_KEY
  );

  // Verify the user credentials from the database
  const user = await User.findById(decodedInfoFromAccessToken._id).select(
    "-password -refreshToken"
  );
  if (!user) {
    throw new CustomApiError(
      400,
      "Unauthorized Request | User not authorized to hit this route"
    );
  }

  // Create a user object and attach it to the request object
  req.user = user;

  // Pass control to the next middleware/controller
  next();
});

export default authorizeUser;
