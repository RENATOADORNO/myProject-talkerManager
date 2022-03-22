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

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
