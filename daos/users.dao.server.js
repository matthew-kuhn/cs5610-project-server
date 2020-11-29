const usersModel = require('../models/users/users.model.server')
const createUser = (user) => usersModel.create(user)
const findUserByCredentials = (username, password) => usersModel.findOne({username: username, password: password})
const findUserByUsername = (username) => usersModel.findOne({username: username})

module.exports = {
    createUser,
    findUserByCredentials,
    findUserByUsername
}
