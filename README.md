# Busque

 ![Busque Logo](https://busque-dev.s3-us-west-2.amazonaws.com/cropped+logo.jpg "Optional title")


[Busque Live Link](https://busque-app.herokuapp.com/)



## Overview

Busque (pronounced "Busk") is a web application designed to help outdoor performers find the best place to perform. Performers can create locations on a map, rate other performers and venues. 

### Group Members
[Cameron Tanjoco](https://github.com/HiThereImCam)

[Alana Shannon](https://github.com/alanashannon)

[David Elrod](https://github.com/thedavidelrod)

[Maxbryan Cosmosse](https://github.com/mcosmosse)




## Features
* Search locations and create new venues 
* Rate and like performers and venues
* Leave comments on performers and venues
* Check in/out of venues. This allows other performers to know which locations are available.



## Technologies
**Backend**
* mongoDB
* AWS S3
* Express
* Mongoose

**Frontend**
* Mapbox 
* React
* Redux
* HTML5
* CSS
* Axios
* React Stars 

## Technical Challenges
1. Utilizing the full potential of Mapbox including allowing users to create points on the map is was the key to success for Busque. This included react components mixed in with Mapbox's own popups and pins.

2. Buskers typically stay in one location for 2 hours. We wanted to have the app automatically check people out after a certain amount of time (we did 5 minutes for testing purposes). Translating this to code proved to be difficult. 

3. Setting up AWS S3 so users are able to upload a photo for their profile or recipe came to be a big obstacle. It was eventually solved by making sure S3 has the correct policies, the app having the correct config vars, and functions sending in the correct form of data.

## Highlights

Writing code that will automatically check out a user after a certain period of time proved to be very difficult. It was achieved with code both in the schedule model and route

Get route
```Venue.find()
    .then((venue) => {
      //res.json(venue)
      Schedule.find()
        .then((schedule) => {
      
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
```
Model
``` let date = new Date();
// round time up to the nearest minute
// 300000 = 5 min
let expireTime = date.setTime(date.getTime() + 300000);
console.log("date now: ", date);
console.log("Big D Date now: ", Date.now());

const ScheduleSchema = new Schema({
  venueID: {
    type: Schema.Types.ObjectId,
    ref: "venues",
    required: true,
  },
  currentUser: { type: Schema.Types.ObjectId, ref: "users", required: true },

  expiresAt: {
    type: Date,
    index: {
      expireAfterSeconds: 300000,
    },
    default: expireTime,
  },
});
 ```
 
 
 
 

