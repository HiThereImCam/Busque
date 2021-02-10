import { RECEIVE_ALL_VENUE_LIKES, RECEIVE_VENUE_LIKES, CREATE_VENUE_LIKE, REMOVE_VENUE_LIKE } from '../actions/venue_actions';

const likesReducer = (state = {}, action) => {
    Object.freeze(state); 

    switch(action.type) {
        // case RECEIVE_VENUE_LIKES:
        //     return action.venue.data
        case CREATE_VENUE_LIKE:
            return Object.assign({}, state, { [action.like.data._id]: action.like.data})
        default: 
            return state;
    }
}

export default likesReducer; 