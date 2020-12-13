const usersModel = require('../models/users/users.model.server')
const createUser = (user) => usersModel.create(user)
const findUserByCredentials = (username, password) => usersModel.findOne({username: username, password: password}).populate('blockedUsers')
const findUserByUsername = (username) => usersModel.findOne({username: username}).populate('blockedUsers')
const blockUser = (userId) =>
    usersModel.findByIdAndUpdate(userId, {blocked: true})
const addBlockedUser = (userId, currentAdmin) =>
    usersModel.findByIdAndUpdate(currentAdmin._id, { $push: { blockedUsers: userId } })
const unblockUser = (userId) =>
    usersModel.findByIdAndUpdate(userId, {blocked: false})
const deleteBlockedUser = (userId, currentAdmin) =>
    usersModel.findByIdAndUpdate(currentAdmin._id, { $pull: { blockedUsers: userId } })
const editUser = (user) => usersModel.findByIdAndUpdate(user._id, {username: user.username, name: user.name, password: user.password})

module.exports = {
    createUser,
    findUserByCredentials,
    findUserByUsername,
    blockUser,
    editUser,
    addBlockedUser,
    unblockUser,
    deleteBlockedUser
}
