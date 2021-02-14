import { OPEN_VENUE_MODAL, CLOSE_VENUE_MODAL } from "../actions/venue_actions";

const VenueModalReducer = (initialState = false, action) => {
  Object.freeze(initialState);

  switch (action.type) {
    case OPEN_VENUE_MODAL:
      return action.value;
    case CLOSE_VENUE_MODAL:
      return action.value;
    default:
      return initialState;
  }
};

export default VenueModalReducer;
