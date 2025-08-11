const express = require('express');
const cmsController = require('../controllers/cms.controller');
const { protect, adminMiddleware } = require('../middlewares/auth.middleware');

const multer = require('multer');
const upload = multer();
const router = express.Router();

router.get('/banner', cmsController.getBanner);
router.get('/banner/:id', cmsController.getBannerById);
router.get('/banner-by-page', cmsController.getBannerByPage);
router.post('/banner', protect, adminMiddleware, upload.single('image'), cmsController.createBanner);
router.put('/banner/:id', protect, adminMiddleware, upload.single('image'), cmsController.updateBanner);
router.delete('/banner', protect, adminMiddleware, cmsController.deleteBanner);

router.get('/cta', cmsController.getCta);
router.get('/cta/:id', cmsController.getCtaById);
router.get('/cta-by-page', cmsController.getCtaByPage);
router.post('/cta', protect, adminMiddleware, upload.single('image'), cmsController.createCta);
router.put('/cta/:id', protect, adminMiddleware, upload.single('image'), cmsController.updateCta);
router.delete('/cta/:id', protect, adminMiddleware, cmsController.deleteCta);

router.get('/faqs', cmsController.getFAQs);
router.get('/faqs/:id', cmsController.getFAQ);
router.post('/faqs', protect, adminMiddleware, cmsController.createFAQ);
router.post('/order-faqs', protect, adminMiddleware, cmsController.updateFAQOrder);
router.put('/faqs/:id', protect, adminMiddleware, cmsController.updateFAQ);
router.delete('/faqs/:id', protect, adminMiddleware, cmsController.deleteFAQ);

router.get('/footer', cmsController.getFooter);
router.post('/footer', protect, adminMiddleware, cmsController.upsertFooter);
router.delete('/footer', protect, adminMiddleware, cmsController.deleteFooter);

router.get('/how-it-works', cmsController.getHowItWorksList);
router.get('/how-it-works/:id', cmsController.getHowItWorks);
router.post('/how-it-works', protect, adminMiddleware, upload.single('image'), cmsController.createHowItWorks);
router.put('/how-it-works/:id', protect, adminMiddleware, upload.single('image'), cmsController.updateHowItWorks);
router.delete('/how-it-works/:id', protect, adminMiddleware, cmsController.deleteHowItWorks);

router.get('/testimonials', cmsController.getTestimonialList);
router.get('/testimonials/:id', cmsController.getTestimonial);
router.post('/testimonials', protect, adminMiddleware, upload.single('image'), cmsController.createTestimonial);
router.post('/order-testimonials', protect, adminMiddleware, cmsController.updateTestimonialOrder);
router.put('/testimonials/:id', protect, adminMiddleware, upload.single('image'), cmsController.updateTestimonial);
router.delete('/testimonials/:id', protect, adminMiddleware, cmsController.deleteTestimonial);

router.get("/announcements", cmsController.getAnnouncements);
router.post("/announcements", protect, adminMiddleware, cmsController.updateAnnouncement);

router.get("/popular-courses", cmsController.getPopularCourses);
router.post("/popular-courses", protect, adminMiddleware, cmsController.updatePopularCourses);

module.exports = router;