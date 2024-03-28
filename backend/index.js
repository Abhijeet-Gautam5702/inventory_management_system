// Imports
import express from "express";
import connectToDatabase from "./src/db/db.js";
import app from "./app.js";

const port = process.env.PORT || 3000;

// Database connection
await connectToDatabase();

// App listener (for errors)
try {
  app.on("error", (error) => {
    console.error(`Express App Error | ${error}`);
  });

  app.listen(port, () => {
    console.log(`Express app running successfully | PORT: ${port}`);
  });
} catch (error) {
  console.error(`Unknown Error | ${error}`);
}
