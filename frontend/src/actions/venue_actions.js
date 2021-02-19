import * as VenueApiUtil from "../util/venue_api_util";

export const RECEIVE_VENUES = "RECEIVE_VENUES";
export const CHECK_IN = "CHECK_IN";
export const OPEN_VENUE_MODAL = "OPEN_VENUE_MODAL";
export const CLOSE_VENUE_MODAL = "CLOSE_VENUE_MODAL";
export const SET_VENUENAME_AND_COORDINATES = "SET_VENUENAME_AND_COORDINATES";
export const RECEIVE_VENUE_ERRORS = "RECEIVE_VENUE_ERRORS";
export const ADD_VENUE_TO_VENUES = "ADD_VENUE_TO_VENUES";

const receiveVenues = (venues) => ({
  type: RECEIVE_VENUES,
  venues,
});

const checkedIn = (venueSchedule) => ({
  type: CHECK_IN,
  venueSchedule,
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


