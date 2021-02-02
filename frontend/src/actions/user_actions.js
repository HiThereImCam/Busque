import * as UserAPIUtil from "../util/user_api_util";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USER_RATING = "GET_USER_RATING";
export const RECEIVE_USER_RATINGS = "GET_USER_RATINGS";

const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users,
});

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
});

const receiveRating = (rating) => ({
  type: RECEIVE_USER_RATING,
  rating
});

const receiveRatings = (ratings) => ({
  type: RECEIVE_USER_RATINGS,
  ratings
});


export const fetchUsers = () => (dispatch) => {
  return UserAPIUtil.getUsers()
    .then((users) => dispatch(receiveUsers(users)))
    .catch((err) => console.log(err));
};

export const fetchUser = (userId) => (dispatch) =>
  UserAPIUtil.getUser(userId)
    .then((user) => dispatch(receiveUser(user)))
    .catch((err) => console.log(err));


export const createUserRating = (userId, rating) => (dispatch) => {
  return UserAPIUtil.createRating(userId, rating)
    .then((rating) => dispatch(receiveRating(rating)))
    .catch((err) => console.log(err))
};

export const fetchUserRatings = (userId) => (dispatch) => {
  return UserAPIUtil.getUserRatings(userId)
    .then((ratings) => dispatch(receiveRatings(ratings)))
    .catch((err) => console.log(err))
};