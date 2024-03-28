import express from "express";
import asyncHandler from "../utils/asyncHandler.utils.js";

// Healthcheck controller
const healthCheck = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Health Check OK" });
});

export { healthCheck };
