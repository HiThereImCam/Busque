import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from "./errors_reducer";
import nav from "./nav_reducer";
import entities from "./entities_reducer";
import venues from "./venues_reducer";
import comments from "./comments_reducer";
import ratings from "./ratings_reducer";
import venueModal from "./create_venue_reducer";

const RootReducer = combineReducers({
  session,
  nav,
  venueModal,
  errors,
  entities,
  venues,
  comments,
  ratings,
});

export default RootReducer;
