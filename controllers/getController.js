const Tutor = require("../models/Tutors");
const Staff = require("../models/Staff");
const System = require("../models/System");


const getStaff = async (roleCd) => {
  try {
    if (roleCd < 1 || roleCd > 4) {
      return { error: "Invalid rolecd" };
    }

    const staff = await Staff.find({ roleCd: roleCd }).select("-_id discordName discordAvatar roleCd").lean();
    if (staff) {
      return staff;
    }
    return { error: "Profile not found" };
  } catch (e) {
    return { error: "Database find failed" };
  }
}


const getTutors = async () => {
  try {
    const tutors = await Tutor.find().sort({ charId: 1 }).select("-_id charName tutors").lean();
    if (tutors) {
      return tutors;
    }
    return { error: "Profile not found" };
  } catch (e) {
    return { error: "Database find failed" };
  }
}


const getMemberCount = async () => {
  try {
    const count = await System.findOne({ paramName: "memberCount" }).lean();
    if (count) {
      return count.paramValue;
    }
    return 6200;
  } catch (e) {
    return { error: "Database find failed" };
  }
}


module.exports = {
  getStaff,
  getTutors,
  getMemberCount
}
