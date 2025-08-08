const express = require('express');
const bannerController = require('../controllers/banner.controller');
const ctaController = require('../controllers/cta.controller');
const faqController = require('../controllers/faq.controller');
const footerController = require('../controllers/footer.controller');
const howItWorksController = require('../controllers/howItWorks.controller');
const testimonialsController = require('../controllers/testimonial.controller');
const { protect, adminMiddleware } = require('../middlewares/auth.middleware');

const multer = require('multer');
const upload = multer();
const router = express.Router();

router.get('/banner/', bannerController.getBanner);
router.get('/banner/:id', bannerController.getBannerById);
router.get('/banner-by-page/', bannerController.getBannerByPage);
router.post('/banner/', protect, adminMiddleware, upload.single('image'), bannerController.createBanner);
router.put('/banner/:id', protect, adminMiddleware, upload.single('image'), bannerController.updateBanner);
router.delete('/banner/', protect, adminMiddleware, bannerController.deleteBanner);

router.get('/cta/', ctaController.getCta);
router.get('/cta/:id', ctaController.getCtaById);
router.get('/cta-by-page/', ctaController.getCtaByPage);
router.post('/cta/', protect, adminMiddleware, upload.single('image'), ctaController.createCta);
router.put('/cta/:id', protect, adminMiddleware, upload.single('image'), ctaController.updateCta);
router.delete('/cta/:id', protect, adminMiddleware, ctaController.deleteCta);

router.get('/faqs/', faqController.getFAQs);
router.get('/faqs/:id', faqController.getFAQ);
router.post('/faqs/', protect, adminMiddleware, faqController.createFAQ);
router.put('/faqs/:id', protect, adminMiddleware, faqController.updateFAQ);
router.delete('/faqs/:id', protect, adminMiddleware, faqController.deleteFAQ);

router.get('/footer/', footerController.getFooter);
router.post('/footer/', protect, adminMiddleware, footerController.upsertFooter);
router.delete('/footer/', protect, adminMiddleware, footerController.deleteFooter);

router.get('/how-it-works/', howItWorksController.getHowItWorksList);
router.get('/how-it-works/:id', howItWorksController.getHowItWorks);
router.post('/how-it-works/', protect, adminMiddleware, upload.single('image'), howItWorksController.createHowItWorks);
router.put('/how-it-works/:id', protect, adminMiddleware, upload.single('image'), howItWorksController.updateHowItWorks);
router.delete('/how-it-works/:id', protect, adminMiddleware, howItWorksController.deleteHowItWorks);

router.get('/testimonials/', testimonialsController.getTestimonialList);
router.get('/testimonials/:id', testimonialsController.getTestimonial);
router.post('/testimonials/', protect, adminMiddleware, upload.single('image'), testimonialsController.createTestimonial);
router.put('/testimonials/:id', protect, adminMiddleware, upload.single('image'), testimonialsController.updateTestimonial);
router.delete('/testimonials/:id', protect, adminMiddleware, testimonialsController.deleteTestimonial);

module.exports = router;