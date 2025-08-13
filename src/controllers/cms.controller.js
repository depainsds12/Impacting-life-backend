const Banner = require('../models/cms/banner.model');
const ctaModel = require('../models/cms/cta.model');
const FAQ = require('../models/cms/faq.model');
const Footer = require('../models/cms/footer.model');
const HowItWorks = require('../models/cms/howItWorks.model');
const PrivacyPolicy = require('../models/cms/privacyPolicy.model');
const TermsAndConditions = require('../models/cms/termsAndConditions.model');
const Testimonial = require('../models/cms/testimonial.model');
const Announcement = require("../models/cms/announcement.model");

const { uploadToAzure, deleteFromAzure } = require('../utils/azureBlob');
const popularCoursesModel = require('../models/cms/popularCourses.model');

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

exports.getBannerByPage = async (req, res) => {
    try {
        const pageSlug = req.query.page;

        if (!pageSlug) {
            return res.status(400).json({ message: 'Missing page parameter' });
        }

        const item = await Banner.findOne({ slug: pageSlug });

        if (!item) {
            return res.status(404).json({ message: 'Banner not found for this page' });
        }

        res.json(item);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createBanner = async (req, res) => {
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
    try {
        const existingItem = await Banner.findById(req.params.id);
        if (!existingItem) return res.status(404).json({ message: "Not found" });

        let updateData = { ...req.body };

        if (req.file) {

            if (existingItem.image) {
                await deleteFromAzure(existingItem.image);
            }

            const imageUrl = await uploadToAzure(req.file.buffer, `banner-${Date.now()}.jpeg`);
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

            if (existingItem.image) {
                await deleteFromAzure(existingItem.image);
            }

            const imageUrl = await uploadToAzure(req.file.buffer, `cta-${Date.now()}.jpeg`);
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

exports.getFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.find().sort({ order: 1 });
        res.json(faqs);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getFAQ = async (req, res) => {
    try {
        const faq = await FAQ.findById(req.params.id);
        if (!faq) return res.status(404).json({ message: 'FAQ not found' });
        res.json(faq);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createFAQ = async (req, res) => {
    try {
        await FAQ.updateMany({}, { $inc: { order: 1 } });

        const faq = new FAQ({
            ...req.body,
            order: 1
        });

        await faq.save();

        res.status(201).json(faq);
    } catch (error) {
        console.error("Error creating FAQ:", error);
        res.status(400).json({ message: error.message });
    }
};


exports.updateFAQ = async (req, res) => {
    try {
        const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!faq) return res.status(404).json({ message: 'FAQ not found' });
        res.json(faq);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateFAQOrder = async (req, res) => {
    try {
        const orders = Array.isArray(req.body) ? req.body : req.body.orders;

        if (!Array.isArray(orders) || orders.length === 0) {
            return res.status(400).json({ success: false, message: 'Invalid data format. Expected an array of { _id, order }' });
        }

        const ops = [];
        orders.forEach((item, index) => {
            const id = item._id || item.id;
            const order = typeof item.order === 'number' ? item.order : parseInt(item.order);
            if (!id) return;

            ops.push({
                updateOne: {
                    filter: { _id: id },
                    update: { $set: { order } },
                },
            });
        });

        if (ops.length === 0) {
            return res.status(400).json({ success: false, message: 'No valid items to update' });
        }

        const result = await FAQ.bulkWrite(ops);

        return res.status(200).json({
            success: true,
            message: 'FAQ order updated successfully',
            result,
        });
    } catch (error) {
        console.error('Error updating FAQ order:', error);
        return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

exports.deleteFAQ = async (req, res) => {
    try {
        const faq = await FAQ.findByIdAndDelete(req.params.id);
        if (!faq) return res.status(404).json({ message: 'FAQ not found' });
        res.json({ message: 'FAQ deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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
            if (existingItem.image) {
                await deleteFromAzure(existingItem.image);
            }

            const imageUrl = await uploadToAzure(req.file.buffer, `howitworks-${Date.now()}.jpeg`);
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

exports.getTestimonialList = async (req, res) => {
    try {
        const items = await Testimonial.find().sort({ order: 1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getTestimonial = async (req, res) => {
    try {
        const item = await Testimonial.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Not found' });
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createTestimonial = async (req, res) => {
    try {
        let imageUrl = null;
        await Testimonial.updateMany({}, { $inc: { order: 1 } });

        if (req.file) {
            const uniqueFileName = `testimonial-${Date.now()}.jpeg`;
            imageUrl = await uploadToAzure(req.file.buffer, uniqueFileName);
        }

        const item = new Testimonial({
            ...req.body,
            image: imageUrl,
            order: 1
        });

        await item.save();
        res.status(201).json(item);
    } catch (error) {
        console.error("Error creating testimonial:", error);
        res.status(400).json({ message: error.message });
    }
};


exports.updateTestimonial = async (req, res) => {
    try {
        const existingItem = await Testimonial.findById(req.params.id);
        if (!existingItem) return res.status(404).json({ message: 'Not found' });
        let updateData = { ...req.body };
        if (req.file) {
            if (existingItem.image) {
                await deleteFromAzure(existingItem.image);
            }
            const imageUrl = await uploadToAzure(req.file.buffer, `testimonial-${Date.now()}.jpeg`);
            updateData.image = imageUrl;
        }
        const updatedItem = await Testimonial.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateTestimonialOrder = async (req, res) => {
    try {
        const orders = Array.isArray(req.body) ? req.body : req.body.orders;

        if (!Array.isArray(orders) || orders.length === 0) {
            return res.status(400).json({ success: false, message: 'Invalid data format. Expected an array of { _id, order }' });
        }

        const ops = [];
        orders.forEach((item, index) => {
            const id = item._id || item.id;
            const order = typeof item.order === 'number' ? item.order : parseInt(item.order);
            if (!id) return;

            ops.push({
                updateOne: {
                    filter: { _id: id },
                    update: { $set: { order } },
                },
            });
        });

        if (ops.length === 0) {
            return res.status(400).json({ success: false, message: 'No valid items to update' });
        }

        const result = await Testimonial.bulkWrite(ops);

        return res.status(200).json({
            success: true,
            message: 'Testimonial order updated successfully',
            result,
        });
    } catch (error) {
        console.error('Error updating Testimonial order:', error);
        return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

exports.deleteTestimonial = async (req, res) => {
    try {
        const item = await Testimonial.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ message: 'Not found' });
        if (item.image) {
            const result = await deleteFromAzure(item.image);
            if (!result.success) {
                return res.status(200).json({
                    message: 'Item deleted, but failed to delete image from Azure',
                    error: result.message,
                });
            }
        }
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.findOne();
        res.status(200).json({ success: true, data: announcements });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcement.findOneAndUpdate(
            {},
            req.body,
            {
                new: true,
                upsert: true,
            }
        );
        res.status(200).json(announcement);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getPopularCourses = async (req, res) => {
    try {
        const data = await popularCoursesModel.findOne();
        res.status(200).json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updatePopularCourses = async (req, res) => {
    try {
        const data = await popularCoursesModel.findOneAndUpdate(
            {},
            req.body,
            {
                new: true,
                upsert: true,
            }
        );
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
