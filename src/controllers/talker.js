const { fsReader, fsWriter } = require('../services/fs');

const talkerGet = async (_req, res, next) => {
  const talkers = await fsReader(next);
  return res.status(200).json(talkers);
};

const talkerByIdGet = async (req, res, next) => {
  const { id } = req.params;

  const talkers = await fsReader(next);

  const finderTalker = talkers.find((item) => item.id === +id);

  if (!finderTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).json(talkers.find((item) => item.id === +id));
};

const talkerPost = async (req, res, next) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;

  const talkers = await fsReader(next);

  const newId = talkers[talkers.length - 1].id + 1;

  talkers.push({ name, age, id: newId, talk: { watchedAt, rate } });

  await fsWriter(talkers, next);

  res.status(201).json({ name, age, id: newId, talk: { watchedAt, rate } });
};

const talkerPut = async (req, res, next) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;

  const talkers = await fsReader(next);

  if (talkers.every((t) => t.id !== +id)) {
    return res.status(404).json({ message: `Talker com #${id} não encontrado` });
  }

  const editedTalkets = talkers.map((t) => {
    if (t.id === +id) return { name, age, id: +id, talk: { watchedAt, rate } };
    return t;
  });

  await fsWriter(editedTalkets);

  return res.status(200).json({ name, age, id: +id, talk: { watchedAt, rate } });
};

module.exports = {
  talkerGet,
  talkerByIdGet,
  talkerPost,
  talkerPut,
};
