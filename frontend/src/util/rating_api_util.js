import axios from 'axios'; 

export const getAllRatings = () => {
    return axios.get('/api/ratings/')
}; 

export const getRatings = (id) => {
    return axios.get(`/api/ratings/${id}`)
}; 

export const createRating = (rating) => {
    return axios.post(`/api/ratings/`, rating)
}; 

export const deleteRating = (ratingId) => {
    return axios.delete(`/api/ratings/${ratingId}`)
}; 