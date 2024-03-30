import {Router} from 'express';
import { healthCheck } from '../controllers/user.controller.js';

const userRouter=Router();

// Health Check route for testing
userRouter.route("/health-check").post(healthCheck);

export default userRouter;