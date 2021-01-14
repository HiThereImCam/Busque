import axios from "axios";

export const getVenues = () => {
  return axios.get("/api/venues");
};
