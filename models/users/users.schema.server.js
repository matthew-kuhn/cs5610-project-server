const mongoose = require("mongoose");
const usersSchema = mongoose.Schema(
  {
    username: String,
    password: String,
    role: String,
    name: String,
  },
  { collection: "users" }
);
module.exports = usersSchema;
