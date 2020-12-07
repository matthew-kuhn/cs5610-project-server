const mongoose = require("mongoose");
const usersSchema = mongoose.Schema(
  {
      username: String,
      password: String,
      role: String,
      name: String,
      blocked: { type: Boolean, default: false}
  },
  { collection: "users" }
);
module.exports = usersSchema;
