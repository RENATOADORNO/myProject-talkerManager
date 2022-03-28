const express = require('express');

const talkerVerificaton = require('../middlewares/talker.verification');
const auth = require('../middlewares/auth');

const { 
  talkerGet, 
  talkerByIdGet,
  talkerPost,
  talkerPut,
} = require('../controllers/talker');

const router = express.Router();

router.get('/', talkerGet);
router.get('/:id', talkerByIdGet);
router.post('/', auth, talkerVerificaton, talkerPost);
router.put('/:id', auth, talkerVerificaton, talkerPut);

module.exports = router;