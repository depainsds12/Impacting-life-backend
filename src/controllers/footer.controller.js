const Footer = require('../models/footer.model');

exports.getFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne();
    if (!footer) return res.status(404).json({ message: 'Footer not found' });
    res.json(footer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.upsertFooter = async (req, res) => {
  try {
    const footer = await Footer.findOneAndUpdate(
      {},
      req.body,
      {
        new: true,
        upsert: true,
      }
    );
    res.status(200).json(footer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.deleteFooter = async (req, res) => {
  try {
    const footer = await Footer.findOneAndDelete();
    if (!footer) return res.status(404).json({ message: 'Footer not found' });
    res.json({ message: 'Footer deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};