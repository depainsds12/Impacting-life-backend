const Banner = require('../models/banner.model');
const { uploadToAzure, deleteFromAzure } = require('../utils/azureBlob');

exports.getBanner = async (req, res) => {
  try {
    const items = await Banner.find().sort({ order: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBannerById = async (req, res) => {
  try {
    const item = await Banner.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createBanner = async (req, res) => {
  // try {
  //   const existing = await Banner.findOne();
  //   if (existing) return res.status(400).json({ message: 'Banner already exists' });
  //   let imageUrl = req.body.image;
  //   if (req.file) {
  //     imageUrl = await uploadToAzure(req.file.buffer, `banner.jpeg`);
  //   }
  //   const banner = new Banner({
  //     ...req.body,
  //     image: imageUrl
  //   });
  //   await banner.save();
  //   res.status(201).json(banner);
  // } catch (error) {
  //   res.status(400).json({ message: error.message });
  // }
  try {
    let imageUrl = null;

    if (req.file) {
      const uniqueFileName = `banner-${Date.now()}.jpeg`;
      imageUrl = await uploadToAzure(req.file.buffer, uniqueFileName);
    }

    const item = new Banner({
      ...req.body,
      image: imageUrl,
    });

    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBanner = async (req, res) => {
  // try {
  //   let updateData = { ...req.body };
  //   if (req.file) {
  //     updateData.image = await uploadToAzure(req.file.buffer, `banner.jpeg`);
  //   }
  //   const banner = await Banner.findOneAndUpdate({}, updateData, { new: true });
  //   if (!banner) return res.status(404).json({ message: 'Banner not found' });
  //   res.json(banner);
  // } catch (error) {
  //   res.status(400).json({ message: error.message });
  // }
  try {
    const existingItem = await Banner.findById(req.params.id);
    if (!existingItem) return res.status(404).json({ message: "Not found" });

    let updateData = { ...req.body };

    if (req.file) {
      let fileName;

      if (existingItem.image) {
        const urlParts = existingItem.image.split("/");
        fileName = urlParts[urlParts.length - 1];
      } else {
        fileName = `banner-${Date.now()}.jpeg`;
      }

      const imageUrl = await uploadToAzure(req.file.buffer, fileName);
      updateData.image = imageUrl;
    }

    const updatedItem = await Banner.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    // Find the item by ID
    const item = await Banner.findByIdAndDelete(req.params.id);

    if (!item) return res.status(404).json({ message: "Not found" });

    // If the item had an image, delete it from Azure
    if (item.image) {
      const result = await deleteFromAzure(item.image);
      if (!result.success) {
        return res.status(200).json({
          message: "Item deleted, but failed to delete image from Azure",
          error: result.message,
        });
      }
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};