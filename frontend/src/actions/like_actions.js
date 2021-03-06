import * as LikeAPIUtil from '../util/like_api_util';

export const RECEIVE_ALL_LIKES = "RECEIVE_ALL_LIKES"; 
export const RECEIVE_USER_LIKES = "RECEIVE_USER_LIKES"; 
export const RECEIVE_VENUE_LIKES = "RECEIVE_VENUE_LIKES"; 
export const CREATE_LIKE = "CREATE_LIKE"; 
export const REMOVE_LIKE = "REMOVE_LIKE"; 

const receiveAllLikes = (likes) => ({
    type: RECEIVE_ALL_LIKES,
    likes
}); 

const receiveUserLikes = (likes) => ({
    type: RECEIVE_USER_LIKES, 
    likes
}); 

const receiveVenueLikes = (likes) => ({
    type: RECEIVE_VENUE_LIKES, 
    likes
}); 

const receiveLike = (like) => ({
    type: CREATE_LIKE, 
    like
}); 

const removeLike = (likeId) => ({
    type: REMOVE_LIKE, 
    likeId
}); 

export const fetchAllLikes = () => (dispatch) => {
    return LikeAPIUtil.getLikes()
        .then(likes => dispatch(receiveAllLikes(likes)))
        .catch((err) => console.log(err))
}; 

export const fetchUserLikes = (userId) => (dispatch) => {
    return LikeAPIUtil.getUserLikes(userId)
        .then(likes => dispatch(receiveUserLikes(likes)))
        .catch((err) => console.log(err))
}; 

export const fetchVenueLikes = (venueId) => (dispatch) => {
    return LikeAPIUtil.getVenueLikes(venueId)
        .then(likes => dispatch(receiveVenueLikes(likes)))
        .catch((err) => console.log(err))
}; 

export const createLike = (like) => (dispatch) => {
    return LikeAPIUtil.createLike(like)
        .then(like => dispatch(receiveLike(like)))
        .catch((err) => console.log(err))
}; 

export const deleteLike = (likeId) => (dispatch) => {
    return LikeAPIUtil.deleteLike(likeId)
        .then(() => dispatch(removeLike(likeId)))
        .catch((err) => console.log(err))
};