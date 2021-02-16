import { RECEIVE_VENUE_LIKES, CREATE_VENUE_LIKE, REMOVE_VENUE_LIKE } from '../actions/venue_actions';
import { RECEIVE_USER_LIKES, CREATE_USER_LIKE, REMOVE_USER_LIKE } from '../actions/user_actions'; 

const likesReducer = (state = {}, action) => {
    Object.freeze(state); 
    let newState = Object.assign({}, state)

    switch(action.type) {
        case RECEIVE_USER_LIKES:
            return action.user.data.likes
        // case RECEIVE_VENUE_LIKES:
        //     return action.venue.data
        // case CREATE_VENUE_LIKE:
        //     return Object.assign({}, state, { [action.like.data._id]: action.like.data})
        // case CREATE_USER_LIKE:
        //     console.log(newState)
            // let likeId = action.like.data.likes[action.like.data.likes.length - 1]
            // console.log(likeId)
            // return Object.assign({}, state, { [likeId]: action.like.data })
        // case REMOVE_VENUE_LIKE:
        //     delete newState[action.likeId.config.likeId];
        //     return newState; 
        default: 
            return state;
    }
}

export default likesReducer; 