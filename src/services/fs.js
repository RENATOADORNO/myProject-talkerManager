const fs = require('fs/promises');

const apiTalker = './talker.json';

const fsReader = (next) => fs.readFile(apiTalker)
    .then((data) => JSON.parse(data))
    .catch((err) => next(err));

const fsWriter = async (param, next) => {
  try {
    await fs.writeFile(apiTalker, JSON.stringify(param));
  } catch (err) {
    next(err);
  }
};

module.exports = { fsReader, fsWriter }; 