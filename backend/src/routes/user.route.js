import { Router } from "express";
import {
  healthCheck,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/health-check").post(healthCheck); //For testing only

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);

export default userRouter;
