const logger = require("../helpers/winston").logger("home.js");

const sql = require("../db/query");
const { executeQuery } = require("../helpers/utils");

const getAllEmployeeData = async (req, res, next) => {
  try {
    const result = await executeQuery(sql.getAllEmployee);
    res.json(result.rows);
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};

module.exports = {
  getAllEmployeeData,
};
