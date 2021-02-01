const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let date = new Date();
// round time up to the nearest minute
<<<<<<< HEAD
let expireTime = date.setTime(date.getTime() + 180020);
=======
// 120020 = 3 min
let expireTime = date.setTime(date.getTime() + 120020);
>>>>>>> testbranch-cameron

const ScheduleSchema = new Schema({
  venueID: {
    type: Schema.Types.ObjectId,
    ref: "venues",
    required: true,
  },
  currentUser: { type: Schema.Types.ObjectId, ref: "users", required: true },
  createdAt: { type: Date, expires: "2m", default: Date.now() },
  expiresAt: {
    type: Date,
    expires: "0",
    default: expireTime,
  },
});

module.exports = Schedule = mongoose.model("Schedule", ScheduleSchema);
