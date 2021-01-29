import { CHECK_IN, RECEIVE_VENUES, RECEIVE_COMMENT } from "../actions/venue_actions";
import { formatVenues } from "./venue_selectors";
const VenuesReducer = (state = [], action) => {
  Object.freeze(state);
  let newState = [...state]
  // let newState = Object.assign({}, state); 

  switch (action.type) {
    case RECEIVE_VENUES:
      // return Object.assign({}, state, formatVenues(action.venues));
      return action.venues;
    case CHECK_IN:
      // return Object.assign({}, state, { [action.data.id]: action.data });
      console.log(state.venues); 
    case RECEIVE_COMMENT:
      console.log(state)
      let wholeVenue = newState.find(venue => venue._id === action.comment.data.venue)
      wholeVenue.comments.push(action.comment.data._id)
      return newState 
    default:
      return state;
  }
};

export default VenuesReducer;
