import { RECEIVE_ALL_LIKES, RECEIVE_USER_LIKES, RECEIVE_VENUE_LIKES, CREATE_LIKE, REMOVE_LIKE } from '../actions/like_actions';

const likesReducer = (state = {}, action) => {
    Object.freeze(state); 
    let newState = Object.assign({}, state)

    switch(action.type) {
        case RECEIVE_ALL_LIKES:
            for (let i = 0; i < action.likes.data.length; i++) {
                newState[action.likes.data[i]._id] = action.likes.data[i]
            }
            return newState; 
        case RECEIVE_USER_LIKES:
            for (let j = 0; j < action.likes.data.length; j++) {
                newState[action.likes.data[j]._id] = action.likes.data[j]
            }
            return newState; 
        case RECEIVE_VENUE_LIKES:
            for (let k = 0; k < action.likes.data.length; k++) {
                newState[action.likes.data[k]._id] = action.likes.data[k]
            }
            return newState; 
        case CREATE_LIKE:
            return Object.assign({}, newState, { [action.like.data._id]: action.like.data})
        case REMOVE_LIKE:
            delete newState[action.likeId];
            return newState; 
        default: 
            return state;
    }
}

export default likesReducer; 