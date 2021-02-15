import React from "react";
import ReactDOM from "react-dom";
// import './index.css';
// import App from './App';
import Root from "./components/root";

import configureStore from "./store/store";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "./util/session_api_util";
import { logout } from "./actions/session_actions";

//TESTING
// import { getAllVenueLikes, getVenueLikes, createVenueLike, updateVenueLike, deleteVenueLike } from './util/venue_api_util'; 
import { fetchAllVenueLikes, fetchVenueLikes, createVenueLike, removeVenueLike } from './actions/venue_actions';
import { createUserLike, fetchUserLikes, removeUserLike } from './actions/user_actions';
import { fetchUserComments } from './actions/user_actions';

document.addEventListener("DOMContentLoaded", () => {
  let store;

  // if a returning user has a session token stored in localstorage
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decodedUser = jwt_decode(localStorage.jwtToken);
    const preloadedState = {
      session: { isAuthenticated: true, user: decodedUser },
    };
    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000;
    // if user's token has expired:
    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = "/login";
    }
  } else {
    store = configureStore({});
  }

  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.fetchUserComments = fetchUserComments;
  window.fetchAllVenueLikes = fetchAllVenueLikes; 
  window.fetchVenueLikes = fetchVenueLikes; 
  window.createVenueLike = createVenueLike; 
  window.removeVenueLike = removeVenueLike; 
  window.createUserLike = createUserLike; 
  window.removeUserLike = removeUserLike; 

  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store} />, root);
});
