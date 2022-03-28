const express = require('express');

const loginController = require('../controllers/login');
const loginVerification = require('../middlewares/login.verification');

const router = express.Router();

router.post('/', loginVerification, loginController);

module.exports = router;