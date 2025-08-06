const express = require('express');
const {
  getTestimonialList,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} = require('../controllers/testimonial.controller');
const { protect } = require('../middlewares/auth.middleware');
const multer = require('multer');
const upload = multer();
const router = express.Router();

router.get('/', getTestimonialList);
router.get('/:id', getTestimonial);
router.post('/', protect, upload.single('image'), createTestimonial);
router.put('/:id', protect, upload.single('image'), updateTestimonial);
router.delete('/:id', protect, deleteTestimonial);

module.exports = router;