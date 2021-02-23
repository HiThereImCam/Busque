const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
