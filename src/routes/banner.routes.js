const express = require('express');
const {
  getBanner,
  createBanner,
  updateBanner,
  deleteBanner
} = require('../controllers/banner.controller');
const { protect } = require('../middlewares/auth.middleware');
const multer = require('multer');
const upload = multer();
const router = express.Router();

router.get('/', getBanner);
router.post('/', protect, upload.single('image'), createBanner);
router.put('/', protect, upload.single('image'), updateBanner);
router.delete('/', protect, deleteBanner);

module.exports = router;