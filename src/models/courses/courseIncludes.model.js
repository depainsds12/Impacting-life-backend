const mongoose = require("mongoose");

const courseIncludesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    icon: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("CourseIncludes", courseIncludesSchema);
