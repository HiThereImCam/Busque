import axios from "axios";

export const getUsers = () => {
  return axios.get(`api/users`);
};

export const getUser = (id) => {
  return axios.get(`api/users/current`, {
    params: {
      userId: id,
    },
  });
};

export const getUserRatings = (userId) => {
  // debugger
  return axios.get(`/api/venues/${userId}/ratings`, {
    userId,
  });
};

export const createRating = (userId, rating, user) => {
  return axios.post(`/api/venues/${userId}/ratings`, {
    rating: rating,
    user: user,
  });
};