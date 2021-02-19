const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Like = require("../../models/Likes");


router.post("/new", (req, res) => {
  
  const newLike = new Like({
    likerId: req.body.likerId,
    venueId: req.body.venueId,
    userId: req.body.userId,
  });

  newLike.save()
  .then((like) => res.json(like));
});

router.patch("/edit/:id", (req, res) => {
  mongoose.set("useFindAndModify", false);
  
  Like.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((like) => res.json(like));
});

router.get('/', (req, res) => {
  Like.find()
    .then(likes => res.json(likes))
    .catch(err => res.status(404).json({ likesNotFound: "No likes found" }))
})

router.get(`/users/:id`, (req, res) => {
  Like.find({ "userId": req.params.id })
    .then(likes => {res.json(likes)})
    .catch(err => res.status(404).json({ noLikes: 'User has no likes' }))
})

router.get(`/venues/:id`, (req, res) => {
  Like.find({ "venueId": req.params.id })
    .then((likes) => {
      res.json(likes);
    })
    .catch((err) => res.status(404).json({ noLikes: "Venue has no likes" }));
});


router.delete("/:id", (req, res) => {
  Like.findByIdAndDelete(req.params.id)
    .then((like) => res.json("Like successfully deleted"))
    .catch((err) =>
      res.status(400).json("Like was not successfully deleted")
    );
});

module.exports = router;