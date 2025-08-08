const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  title: String,
  link: String
}, { _id: false });

const footerSchema = new mongoose.Schema({
  businessCreativeSkills: [linkSchema],
  technicalSkills: [linkSchema],
  analyticalDataSkills: [linkSchema],
  careerResources: [linkSchema],
  about: [linkSchema],
  communitySupport: [linkSchema],
  contact: {
    email: String,
    address: String,
    phone: String,
    socialLinks: {
      facebook: String,
      linkedin: String,
      instagram: String,
      x: String,
      google: String
    }
  },
  newsletter: {
    title: String,
    description: String,
  }
});

module.exports = mongoose.model('Footer', footerSchema);
