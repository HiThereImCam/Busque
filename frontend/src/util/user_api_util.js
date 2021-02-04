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

export const getUserComments = (userId) => {
  return axios.get(`/api/users/${userId}/comments`, {
    userId
  })
}; 

export const createUserComment = (userId, comment, commenter) => {
  return axios.post(`/api/users/${userId}/comments`, {
    comment: comment,
    commenter: commenter
  })
};

export const getUserRatings = (userId) => {
  // debugger
  return axios.get(`/api/users/${userId}/ratings`, {
    userId,
  });
};

export const createRating = (userId, rating) => {
  return axios.post(`/api/users/${userId}/ratings`, {
    rating: rating,
  });
};