const reviewsModel = require('../models/reviews/reviews.model.server')
const createReview = (review) => reviewsModel.create(review)
const findReviewsForMovie = (movieId) => reviewsModel.find({movieId: movieId})
const findReviewsForUser = (userId) => reviewsModel.find({userId: userId})
module.exports = {
    createReview,
    findReviewsForMovie,
    findReviewsForUser
}
