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




