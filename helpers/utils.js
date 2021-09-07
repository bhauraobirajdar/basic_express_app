export function sendResponse(res, statusCode = 200, message) {
  res.status(statusCode).json(message);
}

export function validationResponse(error) {
  const errMsg = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const err of error.details) {
    errMsg.push(err.message);
  }
  return errMsg;
}
