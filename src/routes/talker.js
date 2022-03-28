const express = require('express');

const talkerVerificaton = require('../middlewares/talker.verification');
const auth = require('../middlewares/auth');

const { 
  talkerGet, 
  talkerByIdGet,
  talkerPost,
} = require('../controllers/talker');

const router = express.Router();

router.get('/', talkerGet);
router.get('/:id', talkerByIdGet);
router.post('/', auth, talkerVerificaton, talkerPost);

module.exports = router;