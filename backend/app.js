import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// MIDDLEWARES
app.use(express.json()); // Body parser

/* 
    Serve static files residing in "public" folder

    NOTE: `path` module is used so that the path to the public directory is correctly inferred, irrespective of the OS 
*/
app.use(express.static(path.join(__dirname, "public")));

// CORS Middleware
app.use(
  cors({
    optionsSuccessStatus: 200,
    origin: process.env.CORS_ORIGIN, // determines the origin
    credentials: true, // ensures that the API-request sets the cookies in the browser
  })
);

// Cookie-parser Middleware (Gives access to req.cookies object)
app.use(cookieParser());

/*------------------------------------------------------------------------------*/

// ROUTES
import { API_VERSION } from "./constants.js";
import userRouter from "./src/routes/user.route.js";

app.use(`/api/v${API_VERSION}/user`, userRouter);

export default app;
