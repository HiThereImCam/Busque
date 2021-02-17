import * as VenueApiUtil from "../util/venue_api_util";

export const RECEIVE_VENUES = "RECEIVE_VENUES";
export const CHECK_IN = "CHECK_IN";
export const RECEIVE_VENUE_COMMENTS = "RECEIVE_VENUE_COMMENTS";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const RECEIVE_VENUE_RATINGS = "RECEIVE_VENUE_RATINGS";
export const RECEIVE_VENUE_RATING = "RECEIVE_VENUE_RATING";
export const OPEN_VENUE_MODAL = "OPEN_VENUE_MODAL";
export const CLOSE_VENUE_MODAL = "CLOSE_VENUE_MODAL";
export const SET_VENUENAME_AND_COORDINATES = "SET_VENUENAME_AND_COORDINATES";
export const RECEIVE_VENUE_ERRORS = "RECEIVE_VENUE_ERRORS";
export const ADD_VENUE_TO_VENUES = "ADD_VENUE_TO_VENUES";
export const RECEIVE_ALL_VENUE_LIKES = "RECEIVE_ALL_VENUE_LIKES";
export const RECEIVE_VENUE_LIKES = "RECEIVE_VENUE_LIKES";
export const CREATE_VENUE_LIKE = "CREATE_VENUE_LIKE";
export const UPDATE_VENUE_LIKE = "UPDATE_VENUE_LIKE";
export const REMOVE_VENUE_LIKE = "REMOVE_VENUE_LIKE";

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

export const setVenNameAndCoord = (venNameAndCoord) => ({
  type: SET_VENUENAME_AND_COORDINATES,
  venNameAndCoord,
});

export const getVenueErrors = (errors) => ({
  type: RECEIVE_VENUE_ERRORS,
  errors,
});

export const addVenue = (venue) => ({
  type: ADD_VENUE_TO_VENUES,
  venue,
});

const receiveAllVenueLikes = (likes) => ({
  type: RECEIVE_ALL_VENUE_LIKES,
  likes,
});

const receiveVenueLikes = (venue, likes) => ({
  type: RECEIVE_VENUE_LIKES,
  venue,
  likes,
});

const receiveVenueLike = (like) => ({
  type: CREATE_VENUE_LIKE,
  like,
});

//update?

const deleteVenueLike = (like) => ({
  type: REMOVE_VENUE_LIKE,
  like
})

export const fetchVenues = () => (dispatch) =>
  VenueApiUtil.getVenues().then((venues) => {
    dispatch(receiveVenues(venues.data));
  });

export const checkIn = (venueID, currentUser) => (dispatch) =>
  VenueApiUtil.checkIn(venueID, currentUser).then((updatedVenue) => {
    try {
      let venueSchedule = updatedVenue.data.venueSchedule;
      dispatch(checkedIn(venueSchedule));
    } catch (e) {
      dispatch(getVenueErrors(e));
    }
  });

export const fetchVenueComments = (venueId) => (dispatch) => {
  VenueApiUtil.getVenueComments(venueId)
    .then((venueId, comments) =>
      dispatch(receiveVenueComments(venueId, comments))
    )
    .catch((err) => dispatch(getVenueErrors(err)));
};

export const createComment = (venueId, comment, user) => (dispatch) => {
  return VenueApiUtil.createComment(venueId, comment, user)
    .then((comment) => dispatch(receiveComment(comment)))
    .catch((err) => dispatch(getVenueErrors(err)));
};

export const createVenueRating = (venueId, rating) => (dispatch) => {
  return VenueApiUtil.createVenueRating(venueId, rating)
    .then((rating) => dispatch(receiveRating(rating)))
    .catch((err) => dispatch(getVenueErrors(err)));
};

export const fetchVenueRatings = (venueId) => (dispatch) => {
  return VenueApiUtil.getVenueRatings(venueId)
    .then((ratings) => dispatch(receiveRatings(ratings)))
    .catch((err) => dispatch(getVenueErrors(err)));
};

export const createVenue = (venue, currentUser) => (dispatch) => {
  return VenueApiUtil.createVenue(venue)
    .then((venue) => {
      dispatch(addVenue(venue));
      VenueApiUtil.checkIn(venue._id, currentUser).then((updatedVenue) => {
        try {
          let venueSchedule = updatedVenue.data.venueSchedule;
          dispatch(checkedIn(venueSchedule));
        } catch (e) {
          dispatch(getVenueErrors(e));
        }
      });
    })
    .catch((error) => {
      dispatch(getVenueErrors(error));
    });
};

export const fetchAllVenueLikes = () => (dispatch) => {
  return VenueApiUtil.getAllVenueLikes()
    .then((likes) => dispatch(receiveAllVenueLikes(likes)))
    .catch((err) => console.log(err));
};

export const fetchVenueLikes = (venueId) => (dispatch) => {
  return VenueApiUtil.getVenueLikes(venueId)
    .then((venue, likes) => dispatch(receiveVenueLikes(venue, likes)))
    .catch((err) => console.log(err));
};

export const createVenueLike = (venueId, likerId) => (dispatch) => {
  return VenueApiUtil.createVenueLike(venueId, likerId)
    .then((like) => dispatch(receiveVenueLike(like)))
    .catch((err) => console.log(err));
};

//update?

export const removeVenueLike = (venueId, likerId) => (dispatch) => {
  return VenueApiUtil.deleteVenueLike(venueId, likerId)
    .then(like => dispatch(deleteVenueLike(like)))
    .catch(err => console.log(err))
};
