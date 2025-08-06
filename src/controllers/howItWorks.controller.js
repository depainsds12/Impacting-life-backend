const HowItWorks = require('../models/howItWorks.model');
const { uploadToAzure, deleteFromAzure } = require('../utils/azureBlob');

exports.getHowItWorksList = async (req, res) => {
  try {
    const items = await HowItWorks.find().sort({ order: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getHowItWorks = async (req, res) => {
  try {
    const item = await HowItWorks.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createHowItWorks = async (req, res) => {
  try {
    let imageUrl = null;

    if (req.file) {
      const uniqueFileName = `howitworks-${Date.now()}.jpeg`;
      imageUrl = await uploadToAzure(req.file.buffer, uniqueFileName);
    }

    const item = new HowItWorks({
      ...req.body,
      image: imageUrl,
    });

    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateHowItWorks = async (req, res) => {
  try {
    const existingItem = await HowItWorks.findById(req.params.id);
    if (!existingItem) return res.status(404).json({ message: "Not found" });

    let updateData = { ...req.body };

    if (req.file) {
      let fileName;

      if (existingItem.image) {
        const urlParts = existingItem.image.split("/");
        fileName = urlParts[urlParts.length - 1]; 
      } else {
        fileName = `howitworks-${Date.now()}.jpeg`;
      }

      const imageUrl = await uploadToAzure(req.file.buffer, fileName);
      updateData.image = imageUrl;
    }

    const updatedItem = await HowItWorks.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteHowItWorks = async (req, res) => {
  try {
    // Find the item by ID
    const item = await HowItWorks.findByIdAndDelete(req.params.id);

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