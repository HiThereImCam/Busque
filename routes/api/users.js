const express = require("express");
const fs = require("fs");
const http = require("http");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");
const Comment = require("../../models/Comment");
const Like = require("../../models/Likes");
const validateLikeInput = require("../../validations/likes");

router.get("/", (req, res) => {
  User.find()
    .then((user) => res.json(user)) //TODO have this send objects with check in info
    .catch((err) => res.status(404).json({ nousers: "No users found" }));
});

router.get("/:id", (req, res) => {
  //find venue by ID
  User.findById(req.params.id)
    .populate("ratings", "rating")
    .populate("comments", "comment")
    .then((user) => res.json(user))

    .catch((err) => res.status(404).json({ noUser: "User  not found" }));
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      venues: req.user.venues,
    });
  }
);

router.post("/signup", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res
        .status(400)
        .json({ email: "A user has already registered with this address" });
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        performerType: req.body.performerType,
        bio: req.body.bio,
        imageURL: req.body.imageURL,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
}); //end register

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = { id: user.id, handle: user.handle };

        jwt.sign(
          payload,
          keys.secretOrKey,
          // Tell the key to expire in one hour
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
}); //end login

router.put(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findByIdAndUpdate(
      req.params.id,
      req.body,

      { new: true },
      //error handling
      function (err, response) {
        if (err) {
          console.log("we hit an error" + err);
          res.json({
            message: "Database Update Failure",
          });
        }
        console.log("This is the Response: " + response);
        return res.send(response);
      }
    );
  }
); //end update

router.get(`/:user_id/ratings`, (req, res) => {
  User.findOne({ _id: req.params.user_id })
    .populate("ratings", "rating")
    .then((user) => res.json(user.ratings))
    .catch((err) => {
      res.status(404).json({ ratings: "can't get ratings." });
    });
});

router.post(`/:user_id/ratings`, (req, res) => {
  const newRating = new Rating({
    rating: req.body.rating,
  });
  newRating.save().then((rating) => {
    User.findByIdAndUpdate(
      req.params.user_id,
      { $push: { ratings: rating } },
      { new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  });
});

router.get("/test", (req, res) =>
  res.json({ msg: "This is the users route ya bish" })
);

router.post(
  "/:user_id/comments",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req);
    console.log(res);
    const newComment = new Comment({
      //needs user
      user: req.params.user_id,
      comment: req.body.comment,
      commenter: req.body.commenter,
    });
    console.log(newComment);
    newComment.save().then(
      (comment) => {
        User.findByIdAndUpdate(
          req.params.user_id,
          { $push: { comments: comment } },
          { new: true }
        )
          .then(() => res.json(comment))
          .populate({
            path: "Comments",
            populate: {
              path: "commenter",
              select: { username: 1 },
            },
          })
          .catch((err) => {
            console.log("comment error:", err);
            res.status(500).json({ comment: "we've encountered and error" });
          });
      }
      // response to front end
    );
  }
);

router.get(
  "/:user_id/comments",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req);

    User.findOne({ _id: req.params.user_id })
      .populate({
        path: "comments",
        populate: {
          path: "commenter",
          options: { sort: { date: -1 } },
          select: { username: 1 },
        },
      })
      .then((user) => res.json(user.comments))
      .catch((err) => {
        console.log("comment error:", err);
        res.status(404).json({ comment: "we've encountered and error" });
      });
  }
);

router.patch("/:id/comments/", (req, res) => {
    mongoose.set("useFindAndModify", false);

  Comment.findByIdAndUpdate(req.body._id, req.body, {new: true})
  .then((comment) => res.json(comment))
    
})



router.delete("/:id/comments/", (req, res) => {
  console.log(req);
  console.log(res);
  Like.findByIdAndDelete(req.body._id)
    .then((like) => res.json("Like successfully deleted"))
    .catch((err) => res.status(400).json("Like was not successfully deleted"));
});

router.get("/likes", (req, res) => {
  Like.find()
    .then((likes) => res.json(likes))
    .catch((err) => {
      res.status(404).json({ comment: "we've encountered and error" });
    });
});

router.get("/:id/likes", (req, res) => {
  User.findById(req.params.id)
  .populate('likes')
    .then((likes) => res.json(likes))
    .catch((err) => {
      res.status(404).json({ comment: "we've encountered and error" });
    });
});

router.post("/:id/likes", (req, res) => {
  console.log(req)
  console.log(res)
  const newLike = new Likes({
    userId: req.params.id,
    likerId: req.body.likerId,
  });

  newLike.save().then((like) => {
    User.findByIdAndUpdate(
      req.params.id,
      { $push: { likes: like } },
      { new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => {
        res.status(404).json({ comment: "we've encountered and error" });
      });
  });
});


router.delete("/:id/likes/", (req, res) => {
  console.log(req)
  console.log(res)
  Like.findByIdAndDelete(req.body._id) 
    .then((like) => res.json("Like successfully deleted"))
    .catch((err) => res.status(400).json("Like was not successfully deleted"));
});

module.exports = router;
