import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CustomApiError from "../utils/customApiError.utils.js";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    profilePicture: {
      type: String, //Cloudinary Image URL
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    contact: {
      type: {
        code: Number,
        number: Number,
      },
      required: false,
    },
    refreshToken: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Mongoose Pre-Middleware to hash the password before saving any document
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  try {
    this.password = await bcrypt.hash(this.password.trim(), 10);
  } catch (error) {
    console.error(`Password Hashing Failed | ${error}`);
    throw error; // throw error so that it is catched by the asyncHandler error-block
  }
});

/*
  Business logic for generating access/refresh tokens & possword validation are incorporated in form of mongoose custom method. This is because these methods are exclusive to the "User" documents only (tokens need to be generated for users only; similar for password validation).
*/
// Mongoose custom method: Access Token generation
userSchema.methods.accessTokenGenerator = function () {
  try {
    const accessToken = jwt.sign(
      {
        _id: this._id,
        email: this.email,
        fullname: this.fullname,
      },
      process.env.ACCESS_TOKEN_KEY,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
    return accessToken;
  } catch (error) {
    console.error(`Access Token generation failed | ${error}`);
    throw new CustomApiError(500, `Access Token generation failed | ${error}`); // throw error so that it is catched by the asyncHandler error-block
  }
};

// Mongoose custom method: Refresh Token generation
userSchema.methods.refreshTokenGenerator = function () {
  try {
    const refreshToken = jwt.sign(
      {
        _id: this._id,
        email: this.email,
      },
      process.env.REFRESH_TOKEN_KEY,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );
    return refreshToken;
  } catch (error) {
    console.error(`Refresh Token generation failed | ${error}`);
    throw new CustomApiError(500, `Refresh Token generation failed | ${error}`); // throw error so that it is catched by the asyncHandler error-block
  }
};

// Mongoose custom method: Password validation
userSchema.methods.validatePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.error(`Password validation failed | ${error}`);
    throw new CustomApiError(500, `Password validation failed | ${error}`); // throw error so that it is catched by the asyncHandler error-block
  }
};

const User = mongoose.model("User", userSchema);

export default User;
