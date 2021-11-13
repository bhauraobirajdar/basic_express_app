const { GET_USERS, ADD_USER, UPDATE_USER, DELETE_USER } = require('../db/query')
const { executeQuery } = require('../helpers/utils')

const getUserList = async () => {
  return await executeQuery(GET_USERS)
}

const addUserDetails = async (user) => {
  return await executeQuery(ADD_USER, user)
}

const updateUserDetails = async (user) => {
  return await executeQuery(UPDATE_USER, user)
}

const deleteUserDetails = async (user) => {
  return await executeQuery(DELETE_USER, user)
}

module.exports = {
  getUserList,
  addUserDetails,
  updateUserDetails,
  deleteUserDetails,
}
