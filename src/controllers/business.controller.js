const WhyChoose = require("../models/business/whyChoose.model");

// Create
exports.createWhyChoose = async (req, res) => {
  try {
    const data = new WhyChoose(req.body);
    await data.save();
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get
exports.getWhyChoose = async (req, res) => {
  try {
    const data = await WhyChoose.findOne(); // assuming only one doc needed
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update
exports.updateWhyChoose = async (req, res) => {
  try {
    const data = await WhyChoose.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete
exports.deleteWhyChoose = async (req, res) => {
  try {
    await WhyChoose.deleteMany();
    res.json({ message: 'Deleted all entries' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
