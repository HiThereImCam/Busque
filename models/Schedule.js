const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
  venueID: {
    type: Schema.Types.ObjectId,
    ref: "venues",
    required: true,
  },
  currentUser: { type: Schema.Types.ObjectId, ref: "users", required: true },

  expireAt: {
    type: Date,
    default: Date.now,
    index: {
      expires: "5m",
    },
  },
});

module.exports = Schedule = mongoose.model("Schedule", ScheduleSchema);
