const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Comment = require("../../models/Comment");
const Venue = require("../../models/Venue");
const User = require("../../models/User");

router.get("/", (req, res) => {
  Comment.find()
    .then((comments) => res.json(comments))
    .catch((err) =>
      res.status(404).json({ commentsNotFound: "No comments found" })
    );
});

router.post("/new", (req, res) => {
  const newComment = new Comment({
    commenter: req.body.commenter,
    authorId: req.body.user,
    comment: req.body.comment,
    venueId: req.body.venueId,
  });

  newComment.save().then((comment) => res.json(comment));
});
        
router.delete("/:id", (req, res) => {
  Comment.findByIdAndDelete(req.params.id)
    .then((comment) => res.json(`Comment successfully deleted`))
    .catch((err) =>
      res.status(404).json("Comment was not successfully deleted")
    );
});

router.get("/:id", (req, res) => {
  Comment.findById(req.params.id)
    .populate("comments")

    .then((comment) => res.json(comment))
    .catch((err) =>
      res.status(404).json({ commentNotFound: "No comment found" })
    );
});

router.get("/:userId", (req, res) => {
  User.find({ userId: req.params.userId })
    .then((comments) => {
      res.json(comments);
    })          
    .catch((err) =>
      res.status(404).json({ CommentsNotFound: "This user has no comments" })
    );
});

router.get("/:venueId", (req, res) => {
  Venue.find({ venueId: req.params.venueId })

    .then((comments) => {
      res.json(comments);
    })
    .catch((err) =>
      res
        .status(404)
        .json({ recipesCommentsNotFound: "This venue has no comments" })
    );
});

router.patch("/edit/:id", (req, res) => {
  mongoose.set("useFindAndModify", false);

  Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).then((comment) => res.json(comment));
});

module.exports = router;
