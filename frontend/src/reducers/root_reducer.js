import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from "./errors_reducer";
import nav from "./nav_reducer";

const RootReducer = combineReducers({
  session,
  nav,
  errors,
});

export default RootReducer;
