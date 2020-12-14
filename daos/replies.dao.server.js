const repliesModel = require("../models/replies/replies.model.server");
const createReply = (reply) => repliesModel.create(reply);
const findRepliesForReview = (reviewId) =>
  repliesModel.find({ parent: reviewId });
const findRepliesForUser = (userId) => repliesModel.find({ userId: userId });
const flagReply = (reply) =>
  repliesModel.findByIdAndUpdate(reply._id, { flagged: true });
const editReply = (replyId, reply) =>
  repliesModel
    .findByIdAndUpdate(replyId, { text: reply.text })
    .then(repliesModel.findById(replyId));
const findAllReplies = () => repliesModel.find({});
const deleteReply = (replyId) => repliesModel.findByIdAndDelete(replyId);
module.exports = {
  createReply,
  findRepliesForReview,
  findRepliesForUser,
  flagReply,
  editReply,
  findAllReplies,
  deleteReply,
};
