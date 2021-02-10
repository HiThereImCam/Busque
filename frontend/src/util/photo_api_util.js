import axios from "axios";

export const uploadPhoto = (data) => {
  return axios.post("/api/upload/upload", data);
};

export const getPhotos = () => {
  return axios.get("/api/upload");
};

export const getPhoto = (photoId) => {
  return axios.get(`/api/upload/${photoId}`);
};

export const deletePhoto = (photoId) => {
  return axios.delete(`/api/upload/delete/${photoId}`);
};
