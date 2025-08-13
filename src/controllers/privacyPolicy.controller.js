const PrivacyPolicy = require('../models/cms/privacyPolicy.model');

exports.getPrivacyPolicy = async (req, res) => {
  try {
    const policy = await PrivacyPolicy.findOne();
    res.json(policy);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createPrivacyPolicy = async (req, res) => {
  try {
    const policy = new PrivacyPolicy(req.body);
    await policy.save();
    res.status(201).json(policy);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePrivacyPolicy = async (req, res) => {
  try {
    const policy = await PrivacyPolicy.findOneAndUpdate({}, req.body, { new: true });
    res.json(policy);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePrivacyPolicy = async (req, res) => {
  try {
    await PrivacyPolicy.deleteMany({});
    res.json({ message: 'Privacy Policy deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};