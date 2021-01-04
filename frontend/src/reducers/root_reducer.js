import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from "./errors_reducer";
import nav from "./nav_reducer";
import entities from './entities_reducer';

const RootReducer = combineReducers({
  session,
  nav,
  errors,
  entities, 
});


export default RootReducer;
