const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const CourseSchema = new mongoose.Schema({
  name: String,
  image: String,
  detailsImage: String,
  description: String,
  rating: Number,
  reviewsCount: Number,
  learnersCount: Number,

  // Relations
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  badge: { type: mongoose.Schema.Types.ObjectId, ref: "Badge" },
  skillLevel: String,
  trainingType: String,

  // includes: [String],
  
  /// overview
  // prerequisites: String, 
  // benefits: [String],
  
  formats: [{
    name: { type: mongoose.Schema.Types.ObjectId, ref: "Formats" },
    price: Number,
    duration: String,
    durationHours: Number,
    weeks: String,
    code: String,
    techType: String,
    whatsIncluded: String,
    description: String,
    whatYouWillLearn: [String],
  }],

  // modules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Module" }],
  // schedules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Schedule" }],
  // relatedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
  isDeleted: Number
}, { timestamps: true });

CourseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Course", CourseSchema);
