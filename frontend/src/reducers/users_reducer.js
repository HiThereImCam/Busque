import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import {
  RECEIVE_USER,
  RECEIVE_USERS,
  RECEIVE_USER_COMMENT,
  RECEIVE_USER_COMMENTS,
} from "../actions/user_actions";
import { formatUsers } from "./selectors";
// import { CREATE_VENUE_LIKE, REMOVE_VENUE_LIKE } from '../actions/venue_actions';
// import { RECEIVE_USER_LIKES, CREATE_USER_LIKE, REMOVE_USER_LIKE, UPDATE_USER_LIKE } from '../actions/user_actions';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, {
        [action.currentUser.id]: action.currentUser,
      });
    case RECEIVE_USER:
      return Object.assign({}, state, {
        [action.user.data._id]: action.user.data,
      });
    case RECEIVE_USERS:
      return Object.assign({}, state, formatUsers(action.users.data));
    case RECEIVE_USER_COMMENT:
      let wholeUser = newState[action.comment.data.user];
      wholeUser.comments.push(action.comment.data._id);
      return newState;
    // case CREATE_USER_LIKE:
    //     let likedUser = newState[action.like.data._id]
    //     let likerId = action.like.data.likes[action.like.data.likes.length - 1]
    //     likedUser.likes.push(likerId)
    //     return newState;
    // case REMOVE_USER_LIKE:
    //     let userLiked = newState[action.like.config.userId]
    //     for (let i = 0; i < userLiked.likes.length; i++) {
    //         if (userLiked.likes[i] === action.like.config.likeId) {
    //             userLiked.likes.splice(i, 1)
    //         }
    //     }
    //     return newState;
    // case UPDATE_USER_LIKE:

    default:
      return state;
  }
};

export default usersReducer;
