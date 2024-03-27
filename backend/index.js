// Imports
import express from "express";
import connectToDatabase from "./src/db/db.js";

const port = process.env.PORT || 3000;

// Middlewares


// Database connection
await connectToDatabase();

// App listener (for errors)