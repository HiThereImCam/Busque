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
// import { fetchAllLikes, createLike, fetchUserLikes, deleteLike } from './actions/like_actions';
// import { fetchAllComments, fetchUserComments, fetchVenueComments, createComment, updateComment, deleteComment } from './actions/comment_actions';
// import { fetchAllRatings, createRating } from './actions/rating_actions';

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
  // window.fetchAllComments = fetchAllComments; 
  // window.createComment = createComment; 
  // window.updateComment = updateComment; 
  // window.deleteComment = deleteComment; 
  // window.fetchUserComments = fetchUserComments;
  // window.fetchVenueComments = fetchVenueComments;
  // window.fetchAllLikes = fetchAllLikes; 
  // window.fetchVenueLikes = fetchVenueLikes; 
  // window.createLike = createLike; 
  // window.deleteLike = deleteLike; 
  // window.fetchUserLikes = fetchUserLikes; 
  // window.fetchAllRatings = fetchAllRatings;
  // window.createRating = createRating; 

  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store} />, root);
});
