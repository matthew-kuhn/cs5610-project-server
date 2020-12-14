const reviewsModel = require("../models/reviews/reviews.model.server");
const createReview = (review) => reviewsModel.create(review);
const findReviewsForMovie = (movieId) =>
  reviewsModel.find({ movieId: movieId });
const findReviewsForUser = (userId) => reviewsModel.find({ userId: userId });
const flagReview = (review) =>
  reviewsModel.findByIdAndUpdate(review._id, { flagged: true });
const editReview = (reviewId, review) =>
  reviewsModel.findByIdAndUpdate(reviewId, {
    text: review.text,
    username: review.username,
  });
const findAllReviews = () => reviewsModel.find({});
const deleteReview = (reviewId) => reviewsModel.findByIdAndDelete(reviewId);
const addReply = (reviewId, reply) =>
  reviewsModel.findByIdAndUpdate(reviewId, { $push: { replies: reply._id } });
const deleteReply = (reviewId, replyId) =>
  reviewsModel.findByIdAndUpdate(reviewId, { $pull: { replies: replyId } });
module.exports = {
  createReview,
  findReviewsForMovie,
  findReviewsForUser,
  flagReview,
  findAllReviews,
  deleteReview,
  editReview,
  addReply,
  deleteReply,
};
