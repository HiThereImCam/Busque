// this file checks if the current user is already checkedInto venue

let userCheckInStatus = (currentUser, venues) => {
  let checkedIn = false;

  venues.forEach((venue) => {
    if (venue.currentUser === currentUser) {
      checkedIn = true;
    }
  });

  return checkedIn;
};

export default userCheckInStatus;
