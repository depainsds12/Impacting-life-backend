const express = require('express');
const { getUsers, registerUser, loginUser, loginAdmin } = require('../controllers/user.controller');
const { protect, admin, user: userRole } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/', getUsers);
router.get('/profile', protect, getUsers);
router.post('/register', registerUser);
router.post('/login/user', loginUser);
router.post('/login/admin', loginAdmin);
module.exports = router;
