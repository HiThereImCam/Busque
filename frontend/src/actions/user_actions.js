import * as UserAPIUtil from '../util/user_api_util';

export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USER = "RECEIVE_USER"; 

const receiveUsers = users => ({
    type: RECEIVE_USERS, 
    users 
});

const receiveUser = email => ({
    type: RECEIVE_USER, 
    email 
});

export const fetchUsers = () => dispatch => (
    UserAPIUtil.getUsers() 
        .then(users => dispatch(receiveUsers(users)))
        .then(err => console.log(err))
);

export const fetchUser = (email) => dispatch => (
    UserAPIUtil.getUser(email)
        .then(email => dispatch(receiveUser(email)))
        .then(err => console.log(err))
);