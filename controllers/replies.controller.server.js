const repliesDao = require("../daos/replies.dao.server");
const reviewsDao = require("../daos/reviews.dao.server");
module.exports = (app) => {
  const postReply = (req, res) => {
    if (req.session["currentUser"]) {
      const reply = req.body;
      reply.username = req.session["currentUser"].username;
      reply.userId = req.session["currentUser"]._id;
      reply.flagged = false;
      repliesDao.createReply(reply).then((reply) => {
        reviewsDao.addReply(req.params.reviewId, reply._id);
        res.json(reply);
      });
    } else {
      res.sendStatus(403);
    }
  };

  const getRepliesForUser = (req, res) => {
    const userId = req.params.userId;
    repliesDao.findRepliesForUser(userId).then((replies) => res.json(replies));
  };

  const getRepliesForReview = (req, res) => {
    const reviewId = req.params.reviewId;
    repliesDao
      .findRepliesForReview(reviewId)
      .then((replies) => res.json(replies));
  };

  const flagReply = (req, res) => {
    const reply = req.body;
    repliesDao.flagReply(reply).then((reply) => res.json(reply));
  };

  const getAllReplies = (req, res) => {
    repliesDao.findAllReplies().then((replies) => res.json(replies));
  };

  const deleteReply = (req, res) => {
    const replyId = req.params.replyId;
    const reviewId = req.params.reviewId;
    reviewsDao.deleteReply(reviewId, replyId);
    repliesDao.deleteReply(replyId).then((result) => res.send(result));
  };

  const editReply = (req, res) => {
    const replyId = req.params.replyId;
    const reply = req.body;
    repliesDao.editReply(replyId, reply).then((result) => res.send(result));
  };

  app.post("/api/reviews/:reviewId/replies", postReply);
  app.get("/api/users/:userId/replies", getRepliesForUser);
  app.get("/api/reviews/:reviewId/replies", getRepliesForReview);
  app.put("/api/replies", flagReply);
  app.get("/api/replies", getAllReplies);
  app.delete("/api/reviews/:reviewId/replies/:replyId", deleteReply);
  app.put("/api/replies/:replyId", editReply);
};
