const express = require('express');
const bodyParser = require('body-parser');
const talkerController = require('./src/controller/talker');
const loginController = require('./src/controller/login');

const app = express();
const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.use(bodyParser.json());
app.use(express.json());

app.use('/talker', talkerController);
app.use('/login', loginController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
