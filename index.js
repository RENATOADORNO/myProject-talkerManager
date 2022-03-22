const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');

const talker = 'talker.json';
const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', async (req, res) => {
  try {
    const data = await fs.readFile(talker);
    res.status(200).json(JSON.parse(data));
  } catch (e) {
    res.status(500).send({ message: 'erro no servidor' });
  }
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;

  fs.readFile(talker)
  .then((data) => {
    const dataId = JSON.parse(data).find((item) => item.id === Number(id));
    if (dataId) {
      return res.status(200).json(dataId);
    }
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  })
  .catch((_err) => res.status(500).send({ message: 'erro no servidor' }));
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
