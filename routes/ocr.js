const express = require('express');
const router = express.Router();
const ocrController = require('../controllers/ocr.controllers');

router.post('/read', ocrController.read);

module.exports = router;