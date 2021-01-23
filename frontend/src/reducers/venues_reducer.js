import { CHECK_IN, RECEIVE_VENUES, RECEIVE_COMMENT } from "../actions/venue_actions";
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
    // case RECEIVE_COMMENT: 
    //   return action.comment.data.comments
      // for (let i = 0; i < action.comment.data.comments.length; i++) {
      //   return Object.assign({}, state, { [action.comment.data.comments[i]]: action.comment.data.comments[i].comment })
      // }
    default:
      return state;
  }
};

export default VenuesReducer;
