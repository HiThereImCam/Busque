import { RECEIVE_PHOTOS, RECEIVE_PHOTO, REMOVE_PHOTO } from "../actions/photo_actions"; 

const photosReducer = (state = {}, action) => {
    Object.freeze(state); 
    let nextState = Object.assign({}, state); 

    switch(action.type) {
        case RECEIVE_PHOTOS: 
            for (let i = 0; i < action.photos.data.length; i++) {
                nextState[action.photos.data[i]._id] = action.photos.data[i]
            }
            return nextState; 
        case RECEIVE_PHOTO: 
            return Object.assign({}, state, {[action.photo.data._id]: action.photo.data})
        case REMOVE_PHOTO:
            delete nextState[action.photoId]
            return nextState; 
        default: 
            return state; 
    }
}

export default photosReducer; 