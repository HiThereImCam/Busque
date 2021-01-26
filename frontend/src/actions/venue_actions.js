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

const receiveVenueComments = (venueId) => ({
  type: RECEIVE_VENUE_COMMENTS, 
  venueId 
})

const receiveComment = (comment) => ({
  type: RECEIVE_COMMENT, 
  comment
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
    .then((venueId) => dispatch(receiveVenueComments(venueId)))
    .catch((err) => console.log(err))
}

export const createComment = (venueId, comment) => dispatch => {
  VenueApiUtil.createComment(venueId, comment)
    .then((comment) => dispatch(receiveComment(comment)))
    .catch((err) => console.log(err))
}
