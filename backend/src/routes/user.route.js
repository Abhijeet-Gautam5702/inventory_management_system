import { Router } from "express";
import {
  healthCheck,
  isUserLoggedIn,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import authorizeUser from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route("/health-check").post(healthCheck); //For testing only

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(authorizeUser, logoutUser);
userRouter.route("/is-user-logged-in").get(authorizeUser, isUserLoggedIn);

export default userRouter;
