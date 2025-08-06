const express = require('express');
const {
  getHowItWorksList,
  getHowItWorks,
  createHowItWorks,
  updateHowItWorks,
  deleteHowItWorks
} = require('../controllers/howItWorks.controller');
const { protect } = require('../middlewares/auth.middleware');
const multer = require('multer');
const upload = multer();
const router = express.Router();

router.get('/', getHowItWorksList);
router.get('/:id', getHowItWorks);
router.post('/', protect, upload.single('image'), createHowItWorks);
router.put('/:id', protect, upload.single('image'), updateHowItWorks);
router.delete('/:id', protect, deleteHowItWorks);

module.exports = router;