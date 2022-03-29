const talkerName = (req, _res, next) => {
  const { name } = req.body;

  const nameNotFound = { message: 'O campo "name" é obrigatório' };
  const nameTooShort = { message: 'O "name" deve ter pelo menos 3 caracteres' };

  if (!name) throw new Error(nameNotFound.message);

  if (name && name.length < 3) throw new Error(nameTooShort.message);

  next();
};

const talkerAge = (req, _res, next) => {
  const { age } = req.body;

  const ageNotFound = { message: 'O campo "age" é obrigatório' };
  const talkerTooYoung = { message: 'A pessoa palestrante deve ser maior de idade' };

  if (!age) throw new Error(ageNotFound.message);

  if (+age < 18) throw new Error(talkerTooYoung.message);

  next();
};

const talkerObj = (req, _res, next) => {
  const { talk } = req.body;

  const talkNotFound = {
    message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  };

  if (!talk) throw new Error(talkNotFound.message);

  next();
};

const talkerTalk = (req, _res, next) => {
  const { talk: { watchedAt, rate } } = req.body;

  const talkNotFound = {
    message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  };

  if (rate !== 0 && (!watchedAt || !rate)) {
    throw new Error(talkNotFound.message);
  }

  next();
};

const talkerDate = (req, _res, next) => {
  const { talk: { watchedAt } } = req.body;
  const date = watchedAt.split('/');

  const wrongDate = { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };

  if (date.length !== 3
    || +date[0] > 31
    || +date[1] > 12) {
      throw new Error(wrongDate.message);
  }

  next();
};

const talkerRate = (req, _res, next) => {
  const { talk: { rate } } = req.body;

  const rateWrong = {
    message: 'O campo "rate" deve ser um inteiro de 1 à 5',
  };

  if (+rate < 1 || +rate > 5) throw new Error(rateWrong.message);

  next();
};

const talkerControllerArr = [
  talkerName,
  talkerAge,
  talkerObj,
  talkerTalk,
  talkerDate,
  talkerRate,
];

module.exports = talkerControllerArr;
