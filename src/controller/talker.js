const express = require('express');
const fs = require('fs/promises');

const router = express.Router();

const talker = 'talker.json';

router.get('/', async (_req, res) => {
  try {
    const data = await fs.readFile(talker);
    res.status(200).json(JSON.parse(data));
  } catch (e) {
    res.status(500).send({ message: 'erro no servidor' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  fs.readFile(talker)
  .then((data) => {
    const dataId = JSON.parse(data).find((item) => item.id === +id);
    if (dataId) {
      return res.status(200).json(dataId);
    }
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  })
  .catch((_err) => res.status(500).send({ message: 'erro no servidor' }));
});

// router.post('/', async (req, res) => {

// });

module.exports = router;