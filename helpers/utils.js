const poolCon = require("../db/db");
const jwt = require("jsonwebtoken");

const sendResponse = (res, statusCode = 200, message) => {
  res.status(statusCode).json(message);
};

const validationResponse = (error) => {
  const errMsg = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const err of error.details) {
    errMsg.push(err.message);
  }
  return errMsg;
};

const executeQuery = async (query, data) => {
  if (data) {
    return await poolCon.query(query, data);
  }
  return await poolCon.query(query);
};

const createJWT = (userData) => {
  return jwt.sign(
    {
      data: userData,
    },
    process.env.SECREAT,
    {
      expiresIn: "1h",
    }
  );
};

module.exports = {
  sendResponse,
  validationResponse,
  executeQuery,
  createJWT,
};
