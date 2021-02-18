import axios from 'axios'; 

export const getComments = () => {
    return axios.get('/api/comments/')
}; 

export const getUserComments = (userId) => {
    return axios.get(`/api/comments/${userId}`)
}; 

export const getVenueComments = (venueId) => {
    return axios.get(`/api/comments/${venueId}`)
}; 

export const createComment = (comment) => {
    return axios.post(`/api/comments/new`, comment)
}; 

export const editComment = (comment) => {
    return axios.patch(`/api/comments/edit/${comment._id}`, comment)
}; 

export const deleteComment = (commentId) => {
    return axios.delete(`/api/comments/${commentId}`)
}; 