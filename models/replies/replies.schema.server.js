const mongoose = require("mongoose");
const repliesSchema = mongoose.Schema(
  {
    text: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "UsersModel" },
    username: String,
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "ReviewsModel" },
    flagged: Boolean,
  },
  { collection: "replies", timestamps: true }
);
module.exports = repliesSchema;
