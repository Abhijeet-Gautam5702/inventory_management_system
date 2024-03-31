import { Router } from "express";
import { healthCheck, registerUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/health-check").post(healthCheck); //For testing only

userRouter.route("/register").post(registerUser);

export default userRouter;
