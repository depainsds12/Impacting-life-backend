const TermsAndConditions = require('../models/termsAndConditions.model');

exports.getTermsAndConditions = async (req, res) => {
  try {
    const terms = await TermsAndConditions.findOne();
    res.json(terms);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createTermsAndConditions = async (req, res) => {
  try {
    const terms = new TermsAndConditions(req.body);
    await terms.save();
    res.status(201).json(terms);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTermsAndConditions = async (req, res) => {
  try {
    const terms = await TermsAndConditions.findOneAndUpdate({}, req.body, { new: true });
    res.json(terms);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTermsAndConditions = async (req, res) => {
  try {
    await TermsAndConditions.deleteMany({});
    res.json({ message: 'Terms and Conditions deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};