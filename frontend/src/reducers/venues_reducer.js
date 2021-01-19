import { RECEIVE_VENUES } from "../actions/venue_actions";

const VenuesReducer = (initialState = [], action) => {
  Object.freeze(initialState);

  switch (action.type) {
    case RECEIVE_VENUES:
      return action.venues;
    default:
      return initialState;
  }
};

export default VenuesReducer;
