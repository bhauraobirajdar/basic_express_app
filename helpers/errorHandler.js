const logger = require('./winston').logger('errorHandler');
// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  logger.error(error.stack);

  if (error && error.status === 404) {
    res.status(404).json({ msg: 'Page not found' });
  } else {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { errorHandler };
