const mongoose = require('mongoose')
const usersSchema = mongoose.Schema({
    username: String,
    password: String
}, {collection: 'users'})
module.exports = usersSchema
