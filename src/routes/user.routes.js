const express = require('express');
const { getUsers } = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/', getUsers);
router.get('/profile', protect, getUsers);
module.exports = router;
