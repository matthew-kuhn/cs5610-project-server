const reviewsModel = require('../models/reviews/reviews.model.server')
const createReview = (review) => reviewsModel.create(review)
const findReviewsForMovie = (movieId) => reviewsModel.find({movieId: movieId})
const findReviewsForUser = (username) => reviewsModel.find({username: username})
const flagReview = (review) => reviewsModel.findByIdAndUpdate(review._id, {flagged: true})
const findAllReviews = () => reviewsModel.find({})
const deleteReview = (reviewId) => reviewsModel.findByIdAndDelete(reviewId)
module.exports = {
    createReview,
    findReviewsForMovie,
    findReviewsForUser,
    flagReview,
    findAllReviews,
    deleteReview
}
