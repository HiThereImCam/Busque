import axios from 'axios'; 

export const getLikes = () => {
    return axios.get('/api/likes/')
}

export const getUserLikes = (userId) => {
    return axios.get(`/api/likes/users/${userId}`, {
        userId
    })
}

export const getVenueLikes = (venueId) => {
    return axios.get(`/api/likes/venues/${venueId}`)
}

export const createLike = like => {
    return axios.post(`/api/likes/new`, like)
}

export const deleteLike = likeId => {
    return axios.delete(`/api/likes/${likeId}`)
}