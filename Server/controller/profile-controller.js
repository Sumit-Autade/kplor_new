const Profile = require("../model/profile-model");
const { User } = require('../model/user-model');

const profilePost = async (req, res) => {
  try {
    const {
      name,
      email,
      university,
      college,
      semester,
      goals,
      timeLeft,
      proficiency,
      studyHoursWeekdays,
      studyHoursWeekends,
    } = req.body;

    const userExist = await User.findOne({ email: email });

    if (!userExist) {
      return res.status(400).json({ msg: "Please use the same email id" });
    }

    const newProfile = new Profile({
      userId: userExist._id,
      email:userExist.email,
      name,
      university,
      college,
      semester,
      goals,
      timeLeft,
      proficiency,
      studyHoursWeekdays,
      studyHoursWeekends,
    });


    await newProfile.save();
    await User.findOneAndUpdate({ email }, { profile: true });
    res.status(200).json({ msg: "user profile created successfully" });

  } catch (error) {
    return  res.status(500).json({ msg: "Server error", error:error.message });
  }
};


module.exports = {
  profilePost
}