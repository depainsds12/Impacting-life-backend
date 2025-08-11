const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  linkText: {
    type: String,
    default: "",
  },
  linkUrl: {
    type: String,
    default: "",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  }
}, { timestamps: true });

module.exports = mongoose.model("Announcement", announcementSchema);
