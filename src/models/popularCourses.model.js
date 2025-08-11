const mongoose = require("mongoose");

const popularCoursesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
}, { timestamps: true });

module.exports = mongoose.model("PopularCourses", popularCoursesSchema);
