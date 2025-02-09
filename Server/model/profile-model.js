const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default:null,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  university: {
    type: String,
    required: true,
    trim: true,
  },
  college: {
    type: String,
    required: true,
    trim: true,
  },
  semester: {
    type: String,
    required: true,
    trim: true,
  },
  goals: {
    type: String,
    required: true,
    trim: true,
  },
  timeLeft: {
    type: Number, // in months
    required: true,
    min: 1,
  },
  proficiency: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
  },
  studyHoursWeekdays: {
    type: Number,
    required: true,
    min: 0,
  },
  studyHoursWeekends: {
    type: Number,
    required: true,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
