const express = require('express');
const {
  getTermsAndConditions,
  createTermsAndConditions,
  updateTermsAndConditions,
  deleteTermsAndConditions
} = require('../controllers/termsAndConditions.controller');
const { protect } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/', getTermsAndConditions);
router.post('/', protect, createTermsAndConditions);
router.put('/', protect, updateTermsAndConditions);
router.delete('/', protect, deleteTermsAndConditions);

module.exports = router;