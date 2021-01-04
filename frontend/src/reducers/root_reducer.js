<<<<<<< HEAD
import { combineReducers } from 'redux'; 
import session from './session_reducer';
import errors from './errors_reducer'; 
import entities from './entities_reducer';

const RootReducer = combineReducers({
    session,
    entities, 
    errors 
})
=======
import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from "./errors_reducer";
import nav from "./nav_reducer";

const RootReducer = combineReducers({
  session,
  nav,
  errors,
});
>>>>>>> 26e4023173982bf2a8d1ef69b5681b2a65879bde

export default RootReducer;
