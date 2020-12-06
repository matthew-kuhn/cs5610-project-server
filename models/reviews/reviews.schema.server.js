const mongoose = require("mongoose");
const reviewsSchema = mongoose.Schema(
  {
      text: String,
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "UsersModel" },
      movieId: String,
      username: String,
      flagged: Boolean
  },
  { collection: "reviews" }
);
module.exports = reviewsSchema;
