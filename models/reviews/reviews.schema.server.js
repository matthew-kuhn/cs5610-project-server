const mongoose = require("mongoose");
const reviewsSchema = mongoose.Schema(
  {
        text: String,
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "UsersModel" },
        movieId: String,
        username: String,
        movieTitle: String,
        flagged: Boolean
  },
  { collection: "reviews" , timestamps: true}
);
module.exports = reviewsSchema;
