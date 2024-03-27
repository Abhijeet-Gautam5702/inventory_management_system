// Imports
import mongoose from "mongoose";
import { DATABASE_NAME } from "../../constants.js";

export default async function connectToDatabase() {
  try {
    // console.log(process);
    const response = await mongoose.connect(
      `${process.env.MONGODB_CONNECTION_STRING}/${DATABASE_NAME}`
    );
    console.log(`Database Connected Successfully | Host: ${response.connection.host}`);
  } catch (error) {
    console.error(error);
  }
}
