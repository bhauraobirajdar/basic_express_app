const logger = require('../helpers/winston').logger('home.js')
const { getAllEmployee } = require('../services/homeService')

const getAllEmployeeData = async (req, res, next) => {
  try {
    const result = await getAllEmployee()
    res.json(result.rows)
  } catch (err) {
    logger.error(err.message)
    next(err)
  }
}

module.exports = {
  getAllEmployeeData,
}
