import axios from 'axios'; 

// set or delete common header depending on whether token is passed in
export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token; 
    } else {
        delete axios.defaults.headers.common['Authorization']; 
    }
}