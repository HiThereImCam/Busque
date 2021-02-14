import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from "./errors_reducer";
import nav from "./nav_reducer";
import entities from "./entities_reducer";
import venues from "./venues_reducer";
import comments from "./comments_reducer";
import ratings from "./ratings_reducer";
import venueModal from "./venue_modal_reducer";
import setVenueNameAndCoordinates from "./set_ven_name_and_coordinates_reducer";
import likes from "./likes_reducer";

const RootReducer = combineReducers({
  session,
  nav,
  venueModal,
  setVenueNameAndCoordinates,
  errors,
  entities,
  venues,
  comments,
  ratings,
  likes,
});

export default RootReducer;
