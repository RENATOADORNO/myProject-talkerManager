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

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ message: 'Token não encontrado' });
  }

  if (authorization.length !== 16) {
    return res.status(401).send({ message: 'Token inválido' });
  }

  next();
};

const talkerName = (req, res, next) => {
  const { name } = req.body;

  const nameNotFound = { message: 'O campo "name" é obrigatório' };
  const nameTooShort = { message: 'O "name" deve ter pelo menos 3 caracteres' };

  if (!name || name === '') res.status(400).json(nameNotFound);

  if (name && name.length < 3) res.status(400).json(nameTooShort);

  next();
};

const talkerAge = (req, res, next) => {
  const { age } = req.body;

  const ageNotFound = { message: 'O campo "age" é obrigatório' };
  const talkerTooYoung = { message: 'A pessoa palestrante deve ser maior de idade' };

  if (!age || age === '') res.status(400).json(ageNotFound);

  if (Number(age) < 18) res.status(400).json(talkerTooYoung);

  next();
};

const talkerObj = (req, res, next) => {
  const { talk } = req.body;

  const talkNotFound = {
    message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  };

  if (!talk) res.status(400).json(talkNotFound);

  next();
};

const talkerTalk = (req, res, next) => {
  const { talk: { watchedAt, rate } } = req.body;

  const talkNotFound = {
    message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  };

  if ((!watchedAt || watchedAt === '')
    || (!rate || rate === '')) {
    res.status(400).json(talkNotFound);
  }

  next();
};

const talkerDate = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const date = watchedAt.split('/');

  const wrongDate = { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };

  if (date.length !== 3
    || Number(date[0]) > 31
    || Number(date[1]) > 12) {
    res.status(400).json(wrongDate);
  }

  next();
};

const talkerRate = (req, res, next) => {
  const { talk: { rate } } = req.body;

  const rateWrong = {
    message: 'O campo "rate" deve ser um inteiro de 1 à 5',
  };

  if (Number(rate) < 1 || Number(rate) > 5) res.status(400).json(rateWrong);

  next();
};

router.post('/', 
  auth, 
  talkerName, 
  talkerAge, 
  talkerObj, 
  talkerTalk, 
  talkerDate, 
  talkerRate,

  async (req, res) => {
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