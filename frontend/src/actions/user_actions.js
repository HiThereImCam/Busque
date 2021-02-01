import * as UserAPIUtil from "../util/user_api_util";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_RATING = "GET_USER_RATING";
export const RECEIVE_RATINGS = "GET_USER_RATINGS";

const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users,
});

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
});

const  receiveRating = (rating) => ({
  type: RECEIVE_RATING,
  rating
})


export const fetchUsers = () => (dispatch) => {
  return UserAPIUtil.getUsers()
    .then((users) => dispatch(receiveUsers(users)))
    .catch((err) => console.log(err));
};

export const fetchUser = (userId) => (dispatch) =>
  UserAPIUtil.getUser(userId)
    .then((user) => dispatch(receiveUser(user)))
    .then((err) => console.log(err));

