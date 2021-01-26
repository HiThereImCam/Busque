import { CHECK_IN, RECEIVE_VENUES, RECEIVE_COMMENT, RECEIVE_VENUE_COMMENTS } from "../actions/venue_actions";
import { formatVenues } from "./venue_selectors";
const VenuesReducer = (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_VENUES:
      // return Object.assign({}, state, formatVenues(action.venues));
      return action.venues;
    case CHECK_IN:
      // return Object.assign({}, state, { [action.data.id]: action.data });
      console.log(state.venues);
    case RECEIVE_VENUE_COMMENTS:
      console.log(action.venueId)
      // return action.venueId.config.venueId
      // for (let i = 0; i < action.venueId.data.length; i++) {
        // return Object.assign({}, state, { [action.venueId.config.venueId]: action.venueId.data })
      // }
    // case RECEIVE_COMMENT:
    //   return action.comment
    default:
      return state;
  }
};

export default VenuesReducer;
