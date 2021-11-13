const { GET_USER_BY_NAME } = require('../db/query')

const getUser = async (data) => {
  return await poolCon.query(GET_USER_BY_NAME, data)
}

module.exports = {
  getUser,
}
