import * as APIUtil from '../util/session_api_util'; 
import jwt_decode from 'jwt-decode'; 

export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT"; 

export const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
}); 

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken') //removes token from local storage
    APIUtil.setAuthToken(false) // removes token from common axios header
    dispatch(logoutUser()) // dispatches logout action
}