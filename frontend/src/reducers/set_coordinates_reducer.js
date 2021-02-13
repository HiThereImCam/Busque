import { SET_VENUE_COORDINATES } from "../actions/venue_actions";

const SetCoordinateReducer = (initialState = [], action) => {
  Object.freeze(initialState);

  switch (action.type) {
    case SET_VENUE_COORDINATES:
      return action.venueCoordinates;
    default:
      return initialState;
  }
};

export default SetCoordinateReducer;
