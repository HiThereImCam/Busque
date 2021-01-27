import { RECEIVE_COMMENT, RECEIVE_VENUE_COMMENTS } from '../actions/venue_actions'; 

const CommentsReducer = (state = {}, action) => {
    Object.freeze(state); 
    let newState = Object.assign({}, state);

    switch(action.type) {
        case RECEIVE_VENUE_COMMENTS:
            for (let i = 0; i < action.venueId.data.length; i++) {
                newState[action.venueId.data[i]._id] = action.venueId.data[i]
            }
            return newState;
        default: 
            return state
    }
}

export default CommentsReducer; 