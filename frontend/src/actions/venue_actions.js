import * as VenueApiUtil from "../util/venue_api_util";

export const RECEIVE_VENUES = "RECEIVE_VENUES";

const receiveVenues = (venues) => ({
  type: RECEIVE_VENUES,
  venues,
});

export const fetchVenues = () => (dispatch) =>
  VenueApiUtil.getVenues().then((venues) => {
    dispatch(receiveVenues(venues.data));
  });
//å.then((err) => console.log(err));
