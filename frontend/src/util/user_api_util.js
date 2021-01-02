import axios from 'axios'; 

export const getUsers = () => {
    return axios.get(`/api/users`)
}

export const getUser = (email) => {
    return axios.get(`api/users/current`)
}