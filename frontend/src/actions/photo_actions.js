import * as PhotoAPIUtil from '../util/photo_api_util'; 

export const RECEIVE_PHOTOS = "RECEIVE_PHOTOS"; 
export const RECEIVE_PHOTO = "RECEIVE_PHOTO"; 
export const REMOVE_PHOTO = "REMOVE_PHOTO"; 

const receivePhotos = photos => ({
    type: RECEIVE_PHOTOS, 
    photos 
});

const receivePhoto = photo => ({
    type: RECEIVE_PHOTO, 
    photo
}); 

const removePhoto = (photoId) => ({
    type: REMOVE_PHOTO, 
    photoId
});

export const getPhotos = () => dispatch => {
    return (
        PhotoAPIUtil.getPhotos()
            .then(photos => dispatch(receivePhotos(photos)))
            .catch(err => console.log(err))
    )
}; 

export const getPhoto = (photoId) => dispatch => {
    return (
        PhotoAPIUtil.getPhoto(photoId)
            .then((photo) => dispatch(receivePhoto(photo)))
            .catch(err => console.log(err))
    )
}; 

export const deletePhoto = (photoId) => dispatch => {
    return (
        PhotoAPIUtil.deletePhoto(photoId)
            .then(() => dispatch(removePhoto(photoId)))
            .catch(err => console.log(err))
    )
}; 