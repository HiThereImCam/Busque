import * as UserAPIUtil from "../util/user_api_util";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USER = "RECEIVE_USER";

<<<<<<< HEAD
const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users,
=======
const receiveUsers = users => ({
    type: RECEIVE_USERS, 
    users   
>>>>>>> 10c0c386c0e7e02f3d6d5cfdb3f105390c474007
});

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
});

export const fetchUsers = () => (dispatch) => {
  return UserAPIUtil.getUsers()
    .then((users) => dispatch(receiveUsers(users)))
    .catch((err) => console.log(err));
};

export const fetchUser = (userId) => (dispatch) =>
  UserAPIUtil.getUser(userId)
    .then((user) => dispatch(receiveUser(user)))
    .then((err) => console.log(err));
