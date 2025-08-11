const express = require('express');
const userRoutes = require('./user.routes');
const auth = require('./auth.routes');
const privacyPolicyRoutes = require('./privacyPolicy.routes');
const termsAndConditionsRoutes = require('./termsAndConditions.routes');
const cmsRoutes = require('./cms.routes');
const businessRoutes = require('./business.route');
const { swagger } = require('../docs/swagger-comand');
const router = express.Router();

router.use('/users', userRoutes);
router.use('/auth', auth);
router.use('/privacy-policy', privacyPolicyRoutes);
router.use('/terms-and-conditions', termsAndConditionsRoutes);
router.use('/cms', cmsRoutes);
router.use('/business', businessRoutes);

module.exports = router;
;