const mongoose = require("mongoose");
const repliesSchema = require("./replies.schema.server");
const repliesModel = mongoose.model("RepliesModel", repliesSchema);
module.exports = repliesModel;
