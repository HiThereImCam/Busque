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

import { getVenues } from "./util/venue_api_util";
import { fetchVenues, fetchVenueComments } from "./actions/venue_actions";
import { getVenueComments } from './util/venue_api_util';
// import { getUserRatings, createRating } from "./util/user_api_util";
import { fetchUserRating, fetchUserRatings } from "./actions/user_actions";
import { getPhotos } from './actions/photo_actions'; 
// import { createComment } from "./actions/venue_actions";
// import { createComment } from "./util/venue_api_util";

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
  window.fetchUserRating = fetchUserRating;
  window.fetchUserRatings = fetchUserRatings; 
  // window.fetchUser = fetchUser;
  // window.fetchUsers = fetchUsers; 
  window.fetchVenueComments = fetchVenueComments; 
  window.getVenueComments = getVenueComments; 
  window.fetchVenues = fetchVenues;
  window.getVenues = getVenues;
  window.getPhotos = getPhotos; 
  // window.createComment = createComment; 

  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store} />, root);
});
