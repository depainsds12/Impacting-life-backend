const express = require('express');
const { protect } = require('../middlewares/auth.middleware');
const multer = require('multer');
const { getCta, getCtaById, createCta, updateCta, deleteCta } = require('../controllers/cta.controller');
const upload = multer();
const router = express.Router();

router.get('/', getCta);
router.get('/:id', getCtaById);
router.post('/', protect, upload.single('image'), createCta);
router.put('/:id', protect, upload.single('image'), updateCta);
router.delete('/:id', protect, deleteCta);

module.exports = router;