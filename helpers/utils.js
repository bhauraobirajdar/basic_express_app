
module.exports.sendResponse = function (res, statusCode = 200, message) {
  res.status(statusCode).json(message);
}

module.exports.validationResponse = function(error) {
  const errMsg = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const err of error.details) {
    errMsg.push(err.message);
  }
  return errMsg;
}
