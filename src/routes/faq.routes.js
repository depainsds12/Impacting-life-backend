const express = require('express');
const {
  getFAQs,
  getFAQ,
  createFAQ,
  updateFAQ,
  deleteFAQ
} = require('../controllers/faq.controller');
const { protect } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/', getFAQs);
router.get('/:id', getFAQ);
router.post('/', createFAQ);
router.put('/:id', updateFAQ);
router.delete('/:id', deleteFAQ);

module.exports = router;