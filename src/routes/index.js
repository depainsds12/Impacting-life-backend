const express = require('express');
const userRoutes = require('./user.routes');
const auth = require('./auth.routes');
const privacyPolicyRoutes = require('./privacyPolicy.routes');
const termsAndConditionsRoutes = require('./termsAndConditions.routes');
const faqRoutes = require('./faq.routes');
const howItWorksRoutes = require('./howItWorks.routes');
const bannerRoutes = require('./banner.routes');
const testimonialRoutes = require('./testimonial.routes');
const ctaRoutes = require('./cta.routes');
const { swagger } = require('../docs/swagger-comand');
const router = express.Router();



router.use('/users', userRoutes);
router.use('/auth', auth);
router.use('/privacy-policy', privacyPolicyRoutes);
router.use('/terms-and-conditions', termsAndConditionsRoutes);
router.use('/faqs', faqRoutes);
router.use('/how-it-works', howItWorksRoutes);
router.use('/banner', bannerRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/cta', ctaRoutes);

module.exports = router;
