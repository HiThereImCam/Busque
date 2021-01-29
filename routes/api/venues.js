//! Would suggest placeholders for front end update/delete components

const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
const Venue = require("../../models/Venue");
const validateVenueInput = require("../../validations/venue");
const Comment = require("../../models/Comment");
const Schedule = require("../../models/Schedule");

router.get("/", (req, res) => {
  //venue index
  Venue.find()
    .then((venue) => {
      //res.json(venue)
      Schedule.find()
        .then((schedule) => {
          // traverse through each venue and check if its in the schedule
          // if it is add the schedule data into the venue data
          // if not then current user == empty && availibility == true
          let mergedData = [];

          for (let i = 0; i < venue.length; i++) {
            let venueSchedule = schedule.find((el) => {
              return el.venueID.toString() === venue[i]._id.toString();
            });

            mergedData.push({
              ...venue[i]._doc,
              available: venueSchedule ? false : true,
              currentUser: venueSchedule ? venueSchedule.currentUser : "",
              expiresAt: venueSchedule ? venueSchedule.expiresAt : "",
            });
          }
          res.json(mergedData);
        })
        .catch((err) => {
          console.log("schedule error:", err);
          res.status(404).json({ err: err });
        });
    })
    .catch((err) => res.status(404).json({ novenues: "No venues found" }));
});

router.get("/:id", (req, res) => {
  //find venue by ID
  Venue.findById(req.params.id)

    .then((venue) => res.json(venue))
    .catch((err) => res.status(404).json({ novenue: "Venue not found" }));
});

router.get("/schedule/collection", (req, res) => {
  //schedule index
  Schedule.find()
    .then((schedule) => {
      res.json(schedule);
    })
    .catch((err) => {
      console.log("schedule error:", err);
      res.status(404).json({ schedule: "No schedules found" });
    });
});

router.post(
  //create venue
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateVenueInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors); //union square long-122.4045 lat37.78616 long should be first
    }
    const newVenue = new Venue({
      name: req.body.name,
      coordinate: JSON.parse(req.body.coordinate), //!fuck yeah it works!
      imageURL: req.body.imageURL,
      type: req.body.type,
    });
    newVenue.save().then((venue) => res.json(venue));
  }
); //end post

//update venue
router.patch(
  "/checkin/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Schedule.find({ venueID: 'req.params', function (err, docs) {});
    // docs is the actual document returned
    Schedule.find({ venueID: req.params.id }, (err, schedule) => {
      if (err) {
        console.log("Error: ", err);
        res.json({
          message: err,
        });
      }

      if (schedule.length === 0) {
        const newSchedule = new Schedule({
          venueID: req.params.id,
          currentUser: req.body.currentUser,
        });
        newSchedule.save().then((schedule, err) => {
          if (err) {
            console.log("err: ", err);
            res.json({
              message: err,
            });
          }
          res.json({
            newSchedule: schedule,
          });
        });
      } else {
        res.json({ schedule: schedule });
      }
    });
  }
);

router.patch(
  "/checkout/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      Schedule.findById(req.params.id).then((venue) => {
        // venue.currentUser.pop();
        // res.send(venue);
      });
    } catch (e) {
      console.log("error: ", e);
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Venue.findByIdAndDelete(req.params.id, function (err, response) {
      if (err) {
        console.log(err);
        res.json({
          message: "Database Update Failure",
        });
      }
      console.log(`this is the response: ${response}`);
      return res.send(response);
    });
  }
); //end delete

// maybe post route?

router.post(
  "/:venue_id/comments",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req)
    console.log(res)

    const newComment = new Comment({
      //needs user
      venue: req.params.venue_id,
      comment: req.body.comment,
       user: req.body.user, //*this is the working one at the moment
    });
    console.log(newComment);
    newComment.save().then(
      (comment) => {
        console.log("Comments: ", comment);
        Venue.findByIdAndUpdate(
          req.params.venue_id,
          { $push: { comments: comment } },
          { new: true }
        )
          .populate({
            path: "comments",
            populate: {
              path: "user",
              options: { sort: { date: -1 } },
              select: { username: 1 },
            },
          })
          .then(() => res.json(comment));
      }
      // response to front end
    );
  }
);


// router.get("/:venue_id/comments", (req, res) => {
//   Venue.findOne({id: req.params.comment}).then((venue) =>

//   res.json(venue.comments))
// })

//pulls comments left on a venue
router.get(
  "/:venue_id/comments",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req)
    Venue.findOne({ _id: req.params.venue_id })
      .populate({
        path: "comments",
        populate: {
          path: "user",
          options: { sort: { date: -1 } },
          select: { username: 1 },
        },
      })
      .then((venue) => res.json(venue.comments))
      .catch((err) => {
        console.log("comment error:", err);
        res.status(500).json({ comment: "we've encountered and error" });
      });
  }
);

module.exports = router;
