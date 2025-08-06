const Banner = require('../models/banner.model');
const { uploadToAzure } = require('../utils/azureBlob');

exports.getBanner = async (req, res) => {
  try {
    const banner = await Banner.findOne();
    if (!banner) return res.status(404).json({ message: 'Banner not found' });
    res.json(banner);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createBanner = async (req, res) => {
  try {
    const existing = await Banner.findOne();
    if (existing) return res.status(400).json({ message: 'Banner already exists' });
    let imageUrl = req.body.image;
    if (req.file) {
      imageUrl = await uploadToAzure(req.file.buffer, `banner.jpeg`);
    }
    const banner = new Banner({
      ...req.body,
      image: imageUrl
    });
    await banner.save();
    res.status(201).json(banner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    let updateData = { ...req.body };
    if (req.file) {
      updateData.image = await uploadToAzure(req.file.buffer, `banner.jpeg`);
    }
    const banner = await Banner.findOneAndUpdate({}, updateData, { new: true });
    if (!banner) return res.status(404).json({ message: 'Banner not found' });
    res.json(banner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findOneAndDelete();
    if (!banner) return res.status(404).json({ message: 'Banner not found' });
    res.json({ message: 'Banner deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};