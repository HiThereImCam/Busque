import { SET_VENUENAME_AND_COORDINATES } from "../actions/venue_actions";

const SetVenueNameAndCoordinateReducer = (initialState = [], action) => {
  Object.freeze(initialState);

  switch (action.type) {
    case SET_VENUENAME_AND_COORDINATES:
      return action.venNameAndCoord;
    default:
      return initialState;
  }
};

export default SetVenueNameAndCoordinateReducer;
