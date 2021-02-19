import * as UserAPIUtil from "../util/user_api_util";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USER = "RECEIVE_USER";
export const CHECK_USER_IN = "CHECK_USER_IN";

const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users,
});

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
});

const receiveUserComments = (user, comments) => ({
  type: RECEIVE_USER_COMMENTS,
  user,
  comments,
});

const receiveUserComment = (comment) => ({
  type: RECEIVE_USER_COMMENT,
  comment,
});

const receiveRating = (rating) => ({
  type: RECEIVE_USER_RATING,
  rating,
});

const receiveRatings = (ratings) => ({
  type: RECEIVE_USER_RATINGS,
  ratings,
});

export const checkUserIn = (value) => ({
  type: CHECK_USER_IN,
  value,
});

export const fetchUsers = () => (dispatch) => {
  return UserAPIUtil.getUsers()
    .then((users) => dispatch(receiveUsers(users)))
    .catch((err) => console.log(err));
};

export const fetchUser = (userId) => (dispatch) => {
  return UserAPIUtil.getUser(userId)
    .then((user) => dispatch(receiveUser(user)))
    .catch((err) => console.log(err));
};
