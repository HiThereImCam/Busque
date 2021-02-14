import axios from "axios";

export const getVenues = () => {
  return axios.get("api/venues");
};

export const checkIn = (venueID, currentUser) => {
  return axios.patch(`/api/venues/checkin/${venueID}`, {
    available: false,
    currentUser: currentUser,
  });
};

export const checkOut = (venueID) => {
  return axios.patch(`/api/venues/${venueID}`, {
    available: true,
  });
};

export const getVenueComments = (venueId) => {
  return axios.get(`/api/venues/${venueId}/comments`, {
    venueId,
  });
};

export const createVenue = (venue) => {
  return axios.post(`/api/venues`, venue);
};

export const createComment = (venueId, comment, user) => {
  return axios.post(`/api/venues/${venueId}/comments`, {
    comment: comment,
    user: user,
  });
};

export const getVenueRatings = (venueId) => {
  return axios.get(`/api/venues/${venueId}/ratings`, {
    venueId,
  });
};

export const createVenueRating = (venueId, rating) => {
  return axios.post(`/api/venues/${venueId}/ratings`, {
    rating: rating,
  });
};

export const getAllVenueLikes = () => {
  return axios.get('/api/venues/likes')
};

export const getVenueLikes = (venueId) => {
  return axios.get(`/api/venues/${venueId}/likes`, {
    venueId, 
  })
};

export const createVenueLike = (venueId, likerId) => {
  return axios.post(`/api/venues/${venueId}/likes`, {
    venueId, 
    likerId: likerId
  })
};

export const updateVenueLike = (venueId) => {
  return axios.patch(`/api/venues/${venueId}/edit`, {
    venueId
  })
}

export const deleteVenueLike = (venueId, likeId) => {
  return axios.delete(`/api/venues/${venueId}/likes/delete`, {
    venueId, 
    likeId
  })
};
