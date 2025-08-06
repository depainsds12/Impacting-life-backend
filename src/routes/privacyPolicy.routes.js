const express = require('express');
const {
  getPrivacyPolicy,
  createPrivacyPolicy,
  updatePrivacyPolicy,
  deletePrivacyPolicy
} = require('../controllers/privacyPolicy.controller');
const { protect } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/', getPrivacyPolicy);
router.post('/', protect, createPrivacyPolicy);
router.put('/', protect, updatePrivacyPolicy);
router.delete('/', protect, deletePrivacyPolicy);

module.exports = router;