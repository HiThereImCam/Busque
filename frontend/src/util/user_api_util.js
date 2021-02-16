import axios from "axios";

export const getUsers = () => {
  return axios.get(`api/users`);
};

export const getUser = (id) => {
  return axios.get(`api/users/${id}`, {
    // params: {
      userId: id,
    // },
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

export const getAllUserLikes = () => {
  return axios.get('/api/users/likes')
}; 

export const getUserLikes = (userId) => {
  return axios.get(`/api/users/${userId}/likes`, {
    userId
  })
}; 

export const createUserLike = (userId, likerId) => {
  return axios.post(`/api/users/${userId}/likes`, {
    userId, 
    likerId
  })
}; 

export const updateUserLike = (userId) => {
  return axios.patch(`/api/users/${userId}/edit`, {
    userId
  })
}; 
//! use likeId instead
export const deleteUserLike = (userId, likeId) => {
  return axios.delete(`/api/users/${userId}/likes/`, {
    userId, 
    likeId
  })
}; //add likerId back?