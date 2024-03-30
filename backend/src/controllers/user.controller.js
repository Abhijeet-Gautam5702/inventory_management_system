import express from "express";
import asyncHandler from "../utils/asyncHandler.utils.js";

// Healthcheck controller
const healthCheck = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  res.status(200).json({ email, password });
});

export { healthCheck };
