const ctaModel = require('../models/cta.model');
const { uploadToAzure, deleteFromAzure } = require('../utils/azureBlob');

exports.getCta = async (req, res) => {
    try {
        const items = await ctaModel.find().sort({ order: 1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getCtaById = async (req, res) => {
    try {
        const item = await ctaModel.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Not found' });
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getCtaByPage = async (req, res) => {
    try {
        const pageSlug = req.query.page;

        if (!pageSlug) {
            return res.status(400).json({ message: 'Missing page parameter' });
        }

        const item = await ctaModel.findOne({ slug: pageSlug });

        if (!item) {
            return res.status(404).json({ message: 'CTA not found for this page' });
        }

        res.json(item);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createCta = async (req, res) => {
    try {
        let imageUrl = null;

        if (req.file) {
            const uniqueFileName = `cta-${Date.now()}.jpeg`;
            imageUrl = await uploadToAzure(req.file.buffer, uniqueFileName);
        }

        const item = new ctaModel({
            ...req.body,
            image: imageUrl,
        });

        await item.save();
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateCta = async (req, res) => {
    try {
        const existingItem = await ctaModel.findById(req.params.id);
        if (!existingItem) return res.status(404).json({ message: "Not found" });

        let updateData = { ...req.body };

        if (req.file) {
            let fileName;

            if (existingItem.image) {
                const urlParts = existingItem.image.split("/");
                fileName = urlParts[urlParts.length - 1];
            } else {
                fileName = `cta-${Date.now()}.jpeg`;
            }

            const imageUrl = await uploadToAzure(req.file.buffer, fileName);
            updateData.image = imageUrl;
        }

        const updatedItem = await ctaModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCta = async (req, res) => {
    try {
        // Find the item by ID
        const item = await ctaModel.findByIdAndDelete(req.params.id);

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