const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true, // Keep trim, but no uniqueness
    },
    email: {
      type: String,
      unique: true, // Email should be unique
      trim: true,
    },
    password: {
      type: String,
    },
    googleId: {
      type: String,
    },
    profile: {
      type: Boolean,
      default: false,
    },
    // Fields for OTP-based password reset
    resetOTP: {
      type: Number,
      default: null, // Stores 4-digit OTP
    },
    otpExpiry: {
      type: Date,
      default: null, // Expiration time for OTP
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = {
    User
}