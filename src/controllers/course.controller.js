const Badge = require("../models/courses/badge.model");
const Category = require("../models/courses/category.model");
const Format = require("../models/courses/formats.model");
const Course = require("../models/courses/course.model");
const CourseIncludes = require("../models/courses/courseIncludes.model");

const { uploadToAzure, deleteFromAzure } = require("../utils/azureBlob");

exports.createBadge = async (req, res) => {
    try {
        const badge = await Badge.create(req.body);
        res.status(201).json(badge);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getBadges = async (req, res) => {
    try {
        const badges = await Badge.find();
        res.json(badges);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateBadge = async (req, res) => {
    try {
        const badge = await Badge.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!badge) return res.status(404).json({ message: "Badge not found" });
        res.json(badge);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteBadge = async (req, res) => {
    try {
        const badge = await Badge.findByIdAndDelete(req.params.id);
        if (!badge) return res.status(404).json({ message: "Badge not found" });
        res.json({ message: "Badge deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) return res.status(404).json({ message: "Category not found" });
        res.json(category);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });
        res.json({ message: "Category deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createFormat = async (req, res) => {
    try {
        const format = await Format.create(req.body);
        res.status(201).json(format);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getFormats = async (req, res) => {
    try {
        const formats = await Format.find();
        res.json(formats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateFormat = async (req, res) => {
    try {
        const format = await Format.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!format) return res.status(404).json({ message: "Format not found" });
        res.json(format);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteFormat = async (req, res) => {
    try {
        const format = await Format.findByIdAndDelete(req.params.id);
        if (!format) return res.status(404).json({ message: "Format not found" });
        res.json({ message: "Format deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createCourse = async (req, res) => {
    try {
        const {
            name,
            description,
            rating,
            reviewsCount,
            learnersCount,
            categories,
            badge,
            skillLevel,
            trainingType,
        } = req.body;

        if (!name || !description || !rating || !reviewsCount || !learnersCount || !categories || !badge || !skillLevel || !trainingType) {
            return res.status(400).json({
                success: false,
                message: "All fields (name, description, rating, reviewsCount, learnersCount, categories, badge, skillLevel, trainingType) are required"
            });
        }

        if (!req.files?.image?.[0] || !req.files?.detailsImage?.[0]) {
            return res.status(400).json({
                success: false,
                message: "Both image and detailsImage are required"
            });
        }

        const newCourse = new Course({
            name,
            description,
            rating,
            reviewsCount,
            learnersCount,
            categories,
            badge,
            skillLevel,
            trainingType,
        });

        if (req.files?.image?.[0]) {
            newCourse.image = await uploadToAzure(
                req.files.image[0].buffer,
                `courses/${newCourse._id}-main-${Date.now()}.jpeg`
            );
        }

        if (req.files?.detailsImage?.[0]) {
            newCourse.detailsImage = await uploadToAzure(
                req.files.detailsImage[0].buffer,
                `courses/${newCourse._id}-details-${Date.now()}.jpeg`
            );
        }

        await newCourse.save();

        res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: newCourse
        });
    } catch (error) {
        console.log(error, "error")
        res.status(500).json({
            success: false,
            message: error.message || "Error creating course"
        });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        Object.assign(course, req.body);

        if (req.files?.image?.[0]) {
            let fileName;

            if (course.image) {
                const urlParts = course.image.split("/");
                fileName = "courses/" + urlParts[urlParts.length - 1];
            } else {
                fileName = `courses/${course._id}-main-${Date.now()}.jpeg`;
            }
            course.image = await uploadToAzure(req.files.image[0].buffer, fileName);
        }

        if (req.files?.detailsImage?.[0]) {
            let fileName;

            if (course.detailsImage) {
                const urlParts = course.detailsImage.split("/");
                fileName = "courses/" + urlParts[urlParts.length - 1];
            } else {
                fileName = `courses/${course._id}-main-${Date.now()}.jpeg`;
            }

            course.detailsImage = await uploadToAzure(req.files.detailsImage[0].buffer, fileName);
        }

        await course.save();

        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: course
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Error updating course"
        });
    }
};

exports.getAllCourses = async (req, res) => {
    try {
        const { page = 1, limit = 10, search } = req.query;
        const query = { isDeleted: { $ne: 1 } };

        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            populate: [
                { path: "categories" },
                { path: "badge" },
                { path: "formats.name" }
            ],
            sort: { createdAt: -1 }
        };

        const result = await Course.paginate(query, options);

        res.status(200).json({
            success: true,
            data: result.docs,
            pagination: {
                totalDocs: result.totalDocs,
                totalPages: result.totalPages,
                page: result.page,
                limit: result.limit,
                hasNextPage: result.hasNextPage,
                hasPrevPage: result.hasPrevPage
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate("categories")
            .populate("badge")
            .populate("formats.name");
        if (!course) return res.status(404).json({ message: "Course not found" });
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        if (course.image) {
            await deleteFromAzure(course.image, 'courses/');
        }

        if (course.detailsImage) {
            await deleteFromAzure(course.detailsImage, 'courses/');
        }

        course.isDeleted = 1;
        await course.save();

        res.json({ message: "Course marked as deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createCourseInclude = async (req, res) => {
    try {
        let iconUrl = null;

        if (req.file) {
            const url = await uploadToAzure(req.file.buffer, `course-includes-${Date.now()}.jpeg`);
            iconUrl = url;
        }

        const courseInclude = await CourseIncludes.create({
            name: req.body.name,
            icon: iconUrl
        });

        res.status(201).json({ success: true, data: courseInclude });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};

exports.getCourseIncludes = async (req, res) => {
    try {
        const includes = await CourseIncludes.find().sort({ createdAt: -1 });
        res.status(200).json(includes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCourseInclude = async (req, res) => {
    try {
        const include = await CourseIncludes.findById(req.params.id);
        if (!include) return res.status(404).json({ message: "Not found" });

        if (req.file) {
            if (include.icon) {
                await deleteFromAzure(include.icon);
            }
            const url = await uploadToAzure(req.file.buffer, `course-includes-${Date.now()}.jpeg`);
            include.icon = url;
        }

        include.name = req.body.name || include.name;
        await include.save();

        res.status(200).json({ success: true, data: include });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCourseInclude = async (req, res) => {
    try {
        const include = await CourseIncludes.findById(req.params.id);
        if (!include) return res.status(404).json({ message: "Not found" });

        if (include.icon) {
            await deleteFromAzure(include.icon);
        }

        res.status(200).json({ success: true, message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
