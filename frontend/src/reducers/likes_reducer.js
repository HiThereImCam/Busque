// import { RECEIVE_VENUE_LIKES, CREATE_VENUE_LIKE, REMOVE_VENUE_LIKE } from '../actions/venue_actions';
// import { RECEIVE_USER_LIKES, CREATE_USER_LIKE, REMOVE_USER_LIKE } from '../actions/user_actions'; 
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
        // case RECEIVE_USER_LIKES:
        //     for (let i = 0; i < action.user.data.likes.length; i++) {
        //         newState[action.user.data.likes[i]._id] = action.user.data.likes[i]
        //     }
        //     return newState; 
        // case RECEIVE_VENUE_LIKES:
        //     return action.venue.data
        // case CREATE_VENUE_LIKE:
        //     return Object.assign({}, state, { [action.like.data._id]: action.like.data})
        // case CREATE_USER_LIKE:
        //     console.log(newState)
        //     let likeId = action.like.data.likes[action.like.data.likes.length - 1]
        //     let newData = JSON.parse(action.like.config.data)
        //     return Object.assign({}, newState, { [likeId]: newData })
        // case REMOVE_USER_LIKE:
        //     delete newState[action.like.config.likeId];
        //     return newState; 
        default: 
            return state;
    }
}

export default likesReducer; 