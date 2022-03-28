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

module.exports = {
  talkerGet,
  talkerByIdGet,
  talkerPost,
};
