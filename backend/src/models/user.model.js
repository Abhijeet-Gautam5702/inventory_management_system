import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
      lowercase:true,
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
    throw error;
  }
});

const User = mongoose.model("User", userSchema);

export default User;
