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

export const createVenue = (venue) => {
  return axios.post(`/api/venues`, venue);
};
