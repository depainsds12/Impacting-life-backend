const mongoose = require('mongoose');

const featureBoxSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
});

const whyChooseImpactingLifeSchema = new mongoose.Schema({
  mainTitle: { type: String, required: true },
  mainDescription: { type: String, required: true },
  mainImage: { type: String, required: true },

  featureBoxes: { type: [featureBoxSchema], required: true, validate: [arr => arr.length === 4, 'Exactly 4 feature boxes required'] },

  button1: {
    label: { type: String, required: true },
    link: { type: String, required: true }
  },
  button2: {
    label: { type: String, required: true },
    link: { type: String, required: true }
  }
}, { timestamps: true });

module.exports = mongoose.model('WhyChooseImpactingLife', whyChooseImpactingLifeSchema);
