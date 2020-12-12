const reviewsDao = require("../daos/reviews.dao.server");
module.exports = (app) => {
  const postReview = (req, res) => {
    if (req.session["currentUser"]) {
      console.log(req.session);
      const review = req.body;
      review.username = req.session["currentUser"].username;
      review.userId = req.session["currentUser"]._id;
      review.flagged = false;
      reviewsDao
        .createReview(review)
        .then((actualReview) => res.json(actualReview));
    } else {
      res.sendStatus(403);
    }
  };

  const getReviewsForUser = (req, res) => {
    const userId = req.params.userId;
    reviewsDao
      .findReviewsForUser(userId)
      .then((actualReviews) => res.json(actualReviews));
  };

  const getReviewsForMovie = (req, res) => {
    const movieId = req.params.movieId;
    reviewsDao
      .findReviewsForMovie(movieId)
      .then((actualReviews) => res.json(actualReviews));
  };

  const flagReview = (req, res) => {
    const review = req.body;
    reviewsDao
      .flagReview(review)
      .then((actualReview) => res.json(actualReview));
  };

  const getAllReviews = (req, res) => {
    reviewsDao
      .findAllReviews()
      .then((actualReviews) => res.json(actualReviews));
  };

  const deleteReview = (req, res) => {
    const reviewId = req.params.reviewId;
    reviewsDao.deleteReview(reviewId).then((response) => res.send(response));
  };

  const editReview = (req, res) => {
    const reviewId = req.params.reviewId;
    const review = req.body;
    reviewsDao
      .editReview(reviewId, review)
      .then((response) => res.send(response));
  };

  app.post("/api/reviews", postReview);
  app.get("/api/users/:userId/reviews", getReviewsForUser);
  app.get("/api/movies/:movieId/reviews", getReviewsForMovie);
  app.put("/api/reviews", flagReview);
  app.get("/api/reviews", getAllReviews);
  app.delete("/api/reviews/:reviewId", deleteReview);
  app.put("/api/reviews/:reviewId", editReview);
};
