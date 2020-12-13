const mongoose = require("mongoose");
const usersSchema = mongoose.Schema(
  {
        username: String,
        password: String,
        role: String,
        name: String,
        blocked: { type: Boolean, default: false},
        blockedUsers: [{type: mongoose.Schema.Types.ObjectId, ref: 'UsersModel'}]
  },
  { collection: "users" }
);
module.exports = usersSchema;
