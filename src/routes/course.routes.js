const courseController = require('../controllers/course.controller');
const express = require('express');
const multer = require('multer');
const { protect, adminMiddleware } = require('../middlewares/auth.middleware');
const router = express.Router();
const upload = multer();

router.post("/badges", protect, adminMiddleware, courseController.createBadge);
router.get("/badges", courseController.getBadges);
router.put("/badges/:id", protect, adminMiddleware, courseController.updateBadge);
router.delete("/badges/:id", protect, adminMiddleware, courseController.deleteBadge);

router.post("/categories", protect, adminMiddleware, courseController.createCategory);
router.get("/categories", courseController.getCategories);
router.put("/categories/:id", protect, adminMiddleware, courseController.updateCategory);
router.delete("/categories/:id", protect, adminMiddleware, courseController.deleteCategory);

router.post("/formats", protect, adminMiddleware, courseController.createFormat);
router.get("/formats", courseController.getFormats);
router.put("/formats/:id", protect, adminMiddleware, courseController.updateFormat);
router.delete("/formats/:id", protect, adminMiddleware, courseController.deleteFormat);

router.post("/create", protect, adminMiddleware, upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'detailsImage', maxCount: 1 }
]), courseController.createCourse);
router.get("/list", courseController.getAllCourses);
router.get("/view/:id", courseController.getCourseById);
router.put("/update/:id", protect, adminMiddleware, upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'detailsImage', maxCount: 1 }
]), courseController.updateCourse);
router.delete("/delete/:id", protect, adminMiddleware, courseController.deleteCourse);

router.get("/includes", courseController.getCourseIncludes);
router.post("/includes", protect, adminMiddleware, upload.single("icon"), courseController.createCourseInclude);
router.put("/includes/:id", protect, adminMiddleware, upload.single("icon"), courseController.updateCourseInclude);
router.delete("/includes/:id", protect, adminMiddleware, courseController.deleteCourseInclude);

module.exports = router;