import * as VenueApiUtil from "../util/venue_api_util";

export const RECEIVE_VENUES = "RECEIVE_VENUES";
export const CHECK_IN = "CHECK_IN";
export const RECEIVE_VENUE_COMMENTS = "RECEIVE_VENUE_COMMENTS";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";

const receiveVenues = (venues) => ({
  type: RECEIVE_VENUES,
  venues,
});

const checkedIn = (updatedVenue) => ({
  type: CHECK_IN,
  updatedVenue,
});

const receiveVenueComments = (venue, comments) => ({
  type: RECEIVE_VENUE_COMMENTS, 
  venue, 
  comments
})

const receiveComment = (comment) => ({
  type: RECEIVE_COMMENT, 
  comment,
})

export const fetchVenues = () => (dispatch) =>
  VenueApiUtil.getVenues().then((venues) => {
    dispatch(receiveVenues(venues.data));
  });

export const checkIn = (venueID, currentUser) => (dispatch) =>
  VenueApiUtil.checkIn(venueID, currentUser).then((updatedVenue) => {
    try {
      // console.log("updated venue:", updatedVenue);
      dispatch(checkedIn(updatedVenue));
    } catch (e) {
      console.log(`error: `, e);
    }
  });

export const fetchVenueComments = (venueId) => dispatch => {
  VenueApiUtil.getVenueComments(venueId)
    .then((venueId, comments) => dispatch(receiveVenueComments(venueId, comments)))
    .catch((err) => console.log(err))
}

export const createComment = (venueId, comment, user) => dispatch => {
  return (
    // console.log(venueId),
    // console.log(comment), 
    // console.log(user), 
    VenueApiUtil.createComment(venueId, comment, user)
      .then((comment) => dispatch(receiveComment(comment)))
      .catch((err) => console.log(err))
  )
}
