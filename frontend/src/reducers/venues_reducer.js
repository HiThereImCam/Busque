import {
  CHECK_IN,
  RECEIVE_VENUES,
  RECEIVE_COMMENT,
  RECEIVE_VENUE_COMMENTS,
} from "../actions/venue_actions";
import { formatVenues } from "./venue_selectors";
const VenuesReducer = (state = [], action) => {
  Object.freeze(state);

  let newState = [...state];
  switch (action.type) {
    case RECEIVE_VENUES:
      // return Object.assign({}, state, formatVenues(action.venues));
      return action.venues;
    case CHECK_IN:
      // venue_id and the user_id

      for (let i = 0; i < newState.length; i++) {
        if (
          newState[i]._id.toString() === action.venueSchedule.venueID.toString()
        ) {
          newState[i].currentUser = action.venueSchedule.currentUser;
          newState[i].available = false;
          newState[i].expiresAt = action.venueSchedule.expiresAt;
        }
      }
      return newState;

    // case RECEIVE_VENUE_COMMENTS:
    // return action.venueId.data
    // for (let i = 0; i < action.venueId.data.length; i++) {
    //   return Object.assign({}, state, { [action.venueId]: action.venueId.data.comment })
    // }

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
