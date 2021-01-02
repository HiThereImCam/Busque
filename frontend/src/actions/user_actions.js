import * as UserAPIUtil from '../util/user_api_util';

export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USER = "RECEIVE_USER"; 

const receiveUsers = users => ({
    type: RECEIVE_USERS, 
    users 
});

const receiveUser = ({userId, username, email, bio}) => ({
    type: RECEIVE_USER, 
    userId,
    username,
    email,
    bio 
});

export const fetchUsers = () => dispatch => (
    UserAPIUtil.getUsers() 
        .then(users => dispatch(receiveUsers(users)))
        .then(err => console.log(err))
);

export const fetchUser = (userId) => dispatch => (
    UserAPIUtil.getUser(userId)
        .then(payload => dispatch(receiveUser(payload)))
        .then(err => console.log(err))
);