import * as CommentAPIUtil from '../util/comment_api_util';

export const RECEIVE_ALL_COMMENTS = "RECEIVE_ALL_COMMENTS"; 
export const RECEIVE_USER_COMMENTS = "RECEIVE_USER_COMMENTS"; 
export const RECEIVE_VENUE_COMMENTS = "RECEIVE_VENUE_COMMENTS"; 
export const CREATE_COMMENT = "CREATE_COMMENT"; 
export const REMOVE_COMMENT = "REMOVE_COMMENT"; 

const receiveAllComments = (comments) => ({
    type: RECEIVE_ALL_COMMENTS, 
    comments
}); 

const receiveUserComments = (comments) => ({
    type: RECEIVE_USER_COMMENTS, 
    comments
}); 

const receiveVenueComments = (comments) => ({
    type: RECEIVE_VENUE_COMMENTS, 
    comments
}); 

const receiveComment = (comment) => ({
    type: CREATE_COMMENT, 
    comment
});  

const removeComment = (commentId) => ({
    type: REMOVE_COMMENT, 
    commentId
}); 

export const fetchAllComments = () => (dispatch) => {
    return CommentAPIUtil.getComments()
        .then((comments) => dispatch(receiveAllComments(comments)))
        .catch((err) => console.log(err))
}; 

export const fetchUserComments = (userId) => (dispatch) => {
    return CommentAPIUtil.getUserComments(userId)
        .then((comments) => dispatch(receiveUserComments(comments)))
        .catch((err) => console.log(err))
}; 

export const fetchVenueComments = (venueId) => (dispatch) => {
    return CommentAPIUtil.getVenueComments(venueId)
        .then((comments) => dispatch(receiveVenueComments(comments)))
        .catch((err) => console.log(err))
}; 

export const createComment = (comment) => (dispatch) => {
    return CommentAPIUtil.createComment(comment)
        .then((comment) => dispatch(receiveComment(comment)))
        .catch((err) => console.log(err))
}; 

export const updateComment = (comment) => (dispatch) => {
    return CommentAPIUtil.editComment(comment)
        .then((comment) => dispatch(receiveComment(comment)))
        .catch((err) => console.log(err))
}; 

export const deleteComment = (commentId) => (dispatch) => {
    return CommentAPIUtil.deleteComment(commentId) 
        .then((commentId) => dispatch(removeComment(commentId)))
        .catch((err) => console.log(err))
}; 