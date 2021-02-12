import * as VenueApiUtil from "../util/venue_api_util";

export const RECEIVE_VENUES = "RECEIVE_VENUES";
export const CHECK_IN = "CHECK_IN";
export const RECEIVE_VENUE_COMMENTS = "RECEIVE_VENUE_COMMENTS";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const RECEIVE_VENUE_RATINGS = "RECEIVE_VENUE_RATINGS";
export const RECEIVE_VENUE_RATING = "RECEIVE_VENUE_RATING";
export const OPEN_VENUE_MODAL = "OPEN_VENUE_MODAL";
export const CLOSE_VENUE_MODAL = "CLOSE_VENUE_MODAL";

const receiveVenues = (venues) => ({
  type: RECEIVE_VENUES,
  venues,
});

const checkedIn = (venueSchedule) => ({
  type: CHECK_IN,
  venueSchedule,
});

const receiveVenueComments = (venue, comments) => ({
  type: RECEIVE_VENUE_COMMENTS,
  venue,
  comments,
});

const receiveComment = (comment) => ({
  type: RECEIVE_COMMENT,
  comment,
});

const receiveRating = (rating) => ({
  type: RECEIVE_VENUE_RATING,
  rating,
});

const receiveRatings = (ratings) => ({
  type: RECEIVE_VENUE_RATINGS,
  ratings,
});

export const openVenueModal = (value) => ({
  type: OPEN_VENUE_MODAL,
  value,
});

export const closeVenueModal = (value) => ({
  type: CLOSE_VENUE_MODAL,
  value,
});

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

export const fetchVenueComments = (venueId) => (dispatch) => {
  VenueApiUtil.getVenueComments(venueId)
    .then((venueId, comments) =>
      dispatch(receiveVenueComments(venueId, comments))
    )
    .catch((err) => console.log(err));
};

export const createComment = (venueId, comment, user) => (dispatch) => {
  return VenueApiUtil.createComment(venueId, comment, user)
    .then((comment) => dispatch(receiveComment(comment)))
    .catch((err) => console.log(err));
};

export const createVenueRating = (venueId, rating) => (dispatch) => {
  return VenueApiUtil.createVenueRating(venueId, rating)
    .then((rating) => dispatch(receiveRating(rating)))
    .catch((err) => console.log(err));
};

export const fetchVenueRatings = (venueId) => (dispatch) => {
  return VenueApiUtil.getVenueRatings(venueId)
    .then((ratings) => dispatch(receiveRatings(ratings)))
    .catch((err) => console.log(err));
};

export const createVenue = (venue) => (dispatch) => {
  return VenueApiUtil.createVenue(venue).then((venue) =>
    console.log("This is the venue coming back: ", venue)
  );
};
