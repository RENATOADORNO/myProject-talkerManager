module.exports = (err, _req, res, _next) => {
  res.status(400).json({ message: err.message });
};
