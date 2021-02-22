const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let date = new Date();
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

module.exports = Schedule = mongoose.model("Schedule", ScheduleSchema);
