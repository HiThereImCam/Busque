import * as VenueApiUtil from "../util/venue_api_util";

export const RECEIVE_VENUES = "RECEIVE_VENUES";
export const CHECK_IN = "CHECK_IN";
export const RECEIVE_VENUE_COMMENTS = "RECEIVE_VENUE_COMMENTS";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";

const receiveVenues = (venues) => ({
  type: RECEIVE_VENUES,
  venues,
});

const checkedIn = (venueSchedule) => ({
  type: CHECK_IN,
  venueSchedule,
});

<<<<<<< HEAD
const receiveVenueComments = (venueId) => ({
  type: RECEIVE_VENUE_COMMENTS,
  venueId,
});

const receiveComment = (comment) => ({
  type: RECEIVE_COMMENT,
  comment,
});
=======
const receiveVenueComments = (venue, comments) => ({
  type: RECEIVE_VENUE_COMMENTS, 
  venue, 
  comments
})

const receiveComment = (comment) => ({
  type: RECEIVE_COMMENT, 
  comment,
})
>>>>>>> 45f937281d383d16efbd644250befc23e8e116ae

export const fetchVenues = () => (dispatch) =>
  VenueApiUtil.getVenues().then((venues) => {
    dispatch(receiveVenues(venues.data));
  });

export const checkIn = (venueID, currentUser) => (dispatch) =>
  VenueApiUtil.checkIn(venueID, currentUser).then((updatedVenue) => {
    try {
      let venueSchedule = updatedVenue.data.venueSchedule;
      console.log("venue schedule: ", venueSchedule);
      dispatch(checkedIn(venueSchedule));
    } catch (e) {
      console.log(`error: `, e);
    }
  });

<<<<<<< HEAD
export const checkOut = (venueID) => (dispatch) => {
  // VenueApiUtil.checkout(venueID);
=======
export const fetchVenueComments = (venueId) => (dispatch) => {
  VenueApiUtil.getVenueComments(venueId)
<<<<<<< HEAD
    .then((venueId) => dispatch(receiveVenueComments(venueId)))
    .catch((err) => console.log(err));
};

export const createComment = (venueId, comment) => (dispatch) => {
  VenueApiUtil.createComment(venueId, comment)
    .then((comment) => dispatch(receiveComment(comment)))
    .catch((err) => console.log(err));
>>>>>>> testbranch-cameron
};
=======
    .then((venueId, comments) => dispatch(receiveVenueComments(venueId, comments)))
    .catch((err) => console.log(err))
}

export const createComment = (venueId, comment, user) => dispatch => {
  return (
    VenueApiUtil.createComment(venueId, comment, user)
      .then((comment) => dispatch(receiveComment(comment)))
      .catch((err) => console.log(err))
  )
}
>>>>>>> 45f937281d383d16efbd644250befc23e8e116ae
