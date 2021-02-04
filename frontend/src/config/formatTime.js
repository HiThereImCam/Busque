import moment from "moment";
// convert time from milliseconds to HH:MM:SS
let formatTime = (time) => {
  return moment(time).formatTime("lll");
};

export default formatTime;
