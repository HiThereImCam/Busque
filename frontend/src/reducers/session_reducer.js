import {
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_LOGOUT,
  RECEIVE_USER_SIGN_IN,
} from "../actions/session_actions";

import { CHECK_USER_IN } from "../actions/user_actions";

const initialState = {
  isAuthenticated: false,
  user: {},
  userCheckedIn: false,
};

let sessionReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser,
        userCheckedIn: action.venueCheckedIn,
      };
    case CHECK_USER_IN:
      return {
        ...state,
        userCheckedIn: action.value,
      };
    case RECEIVE_USER_LOGOUT:
      return initialState;

    case RECEIVE_USER_SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
      };
    default:
      return state;
  }
};

export default sessionReducer;
