// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  console.log('Inside errorr **********');
  res.status(500).json(error.message);
};

module.exports = { errorHandler };
