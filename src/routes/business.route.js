const express = require('express');
const router = express.Router();
const businessController = require('../controllers/business.controller');

router.post('/why-choose-impacting-life', businessController.createWhyChoose);
router.get('/why-choose-impacting-life', businessController.getWhyChoose);
router.put('/why-choose-impacting-life', businessController.updateWhyChoose);
router.delete('/why-choose-impacting-life', businessController.deleteWhyChoose);

module.exports = router;
