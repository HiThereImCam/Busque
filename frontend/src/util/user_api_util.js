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
  return axios.get(`/api/users/${userId}/ratings`, {
    userId,
  });
};

export const createRating = (userId, rating, user) => {
  return axios.post(`/api/users/${userId}/ratings`, {
    rating: rating,
    user: user,
  });
};