import axios from "axios";

// set or delete common header depending on whether token is passed in
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const signup = (userData) => {
  return axios.post("/api/users/signup", userData);
};

export const login = (userData) => {
  return axios.post("/api/users/login", userData);
};

export const logout = (userData) => {
  return axios.delete('api/users/logout', userData)
}
