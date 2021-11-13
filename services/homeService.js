const { GET_ALL_EMP } = require('../db/query')
const { executeQuery } = require('../helpers/utils')

const getAllEmployee = async () => {
  return await executeQuery(GET_ALL_EMP)
}

module.exports = {
  getAllEmployee,
}
