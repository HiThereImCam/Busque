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

export const checkOut = (venueID, currentUser) => {
  return axios.patch(`/api/venues/edit/${venueID}`, {
    available: true,
  });
};

export const createComment = (venueId, comment) => {
  return axios.patch(`/api/venues/${venueId}/comments`, {
    comment: comment
  })
};
