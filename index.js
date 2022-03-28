const express = require('express');
const bodyParser = require('body-parser');
const talker = require('./src/routes/talker');
const login = require('./src/routes/login');
const error = require('./src/middlewares/error');

const app = express();
const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.use(bodyParser.json());
app.use(express.json());

app.use('/talker', talker);
app.use('/login', login);
app.use(error);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// FONTES
// https://www.horadecodar.com.br/2020/07/14/como-criar-arquivos-com-node-js-escrever-arquivos/
// https://www.digitalocean.com/community/tutorials/how-to-work-with-files-using-the-fs-module-in-node-js
// https://walde.co/2016/10/24/estrutura-de-diretorios-e-arquivos-em-projetos-node-js/
