const express = require('express');
const userRoutes = require('./user.routes');
const auth = require('./auth.routes');
const { swagger } = require('../docs/swagger-comand');
const router = express.Router();



router.use('/users', userRoutes);
router.use('/auth', auth);

module.exports = router;
