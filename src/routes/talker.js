const express = require('express');
const fs = require('fs/promises');
const register = require('../middlewares/record');
const auth = require('../middlewares/auth');

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

router.post('/', auth, register, async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  fs.readFile(talker, 'utf8')
    .then(async (data) => {
      const dataJson = JSON.parse(data);
      const newId = dataJson[dataJson.length - 1].id + 1;
      dataJson.push({ name, age, id: newId, talk: { watchedAt, rate } });
      try {
        await fs.writeFile(talker, JSON.stringify(dataJson));
        res.status(201).json({ name, age, id: newId, talk: { watchedAt, rate } });
      } catch (err) {
        console.log(err);
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;