import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = ({ user }) => {
  const [profile, setProfile] = useState({
    name: "",
    email: user?.email || "",
    university: "",
    college: "",
    semester: "",
    goals: "",
    timeLeft: "",
    proficiency: "Beginner",
    studyHoursWeekdays: "",
    studyHoursWeekends: "",
  });
  const API_URL = "https://auth-v1-4.onrender.com";

  // Redirect immediately if user.profile is true
  if (user?.profile) {
    window.location.href = "https://kplor.com/";
    return null; // Prevents any UI from rendering
  }

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/profile`, profile);
      console.log("Profile created:", res.data);
      window.location.href = "https://kplor.com/"; // Redirect after successful profile creation
    } catch (err) {
      console.error("Profile creation failed", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <div className="w-full max-w-lg bg-white shadow-xl p-8 rounded-2xl">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Create Your Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
  
          {/* Name Field */}
          <div>
            <label className="block text-blue-900 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
              required
            />
          </div>
  
          {/* Email Field */}
          <div>
            <label className="block text-blue-900 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
              required
            />
          </div>
  
          {/* University Field */}
          <div>
            <label className="block text-blue-900 font-semibold">University</label>
            <input
              type="text"
              name="university"
              value={profile.university}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
              required
            />
          </div>
  
          {/* College Field */}
          <div>
            <label className="block text-blue-900 font-semibold">College</label>
            <input
              type="text"
              name="college"
              value={profile.college}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
              required
            />
          </div>
  
          {/* Semester Field */}
          <div>
            <label className="block text-blue-900 font-semibold">Semester</label>
            <input
              type="text"
              name="semester"
              value={profile.semester}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
              required
            />
          </div>
  
          {/* Goals Field */}
          <div>
            <label className="block text-blue-900 font-semibold">Goals (Objective)</label>
            <textarea
              name="goals"
              value={profile.goals}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
              required
            ></textarea>
          </div>
  
          {/* Time Left to Study */}
          <div>
            <label className="block text-blue-900 font-semibold">Time Left to Study (in months)</label>
            <input
              type="number"
              name="timeLeft"
              min="0"
              max="12"
              value={profile.timeLeft}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
              required
            />
          </div>
  
          {/* Proficiency in Subject */}
          <div>
            <label className="block text-blue-900 font-semibold">Proficiency in Subject</label>
            <select
              name="proficiency"
              value={profile.proficiency}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
  
          {/* Study Hours Weekdays */}
          <div>
            <label className="block text-blue-900 font-semibold">Study Hours (Weekdays)</label>
            <input
              type="number"
              name="studyHoursWeekdays"
              min="0"
              max="24"
              value={profile.studyHoursWeekdays}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
              required
            />
          </div>
  
          {/* Study Hours Weekends */}
          <div>
            <label className="block text-blue-900 font-semibold">Study Hours (Weekends)</label>
            <input
              type="number"
              name="studyHoursWeekends"
              min="0"
              max="24"
              value={profile.studyHoursWeekends}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
              required
            />
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all shadow-md"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
