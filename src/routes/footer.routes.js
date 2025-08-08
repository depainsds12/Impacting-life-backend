const express = require('express');
const router = express.Router();
const footerController = require('../controllers/footer.controller');
const { adminMiddleware, protect } = require('../middlewares/auth.middleware');

router.get('/', footerController.getFooter);
router.post('/', protect, adminMiddleware, footerController.upsertFooter);
router.delete('/', protect, adminMiddleware, footerController.deleteFooter);

module.exports = router;