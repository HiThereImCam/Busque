import { RECEIVE_COMMENT, RECEIVE_VENUE_COMMENTS } from '../actions/venue_actions'; 
import { RECEIVE_USER_COMMENT, RECEIVE_USER_COMMENTS } from '../actions/user_actions';

const CommentsReducer = (state = {}, action) => {
    Object.freeze(state); 
    let newState = Object.assign({}, state);

    switch(action.type) {
        case RECEIVE_VENUE_COMMENTS:
            for (let i = 0; i < action.venue.data.length; i++) {
                newState[action.venue.data[i]._id] = action.venue.data[i]
            }
            return newState;
        case RECEIVE_COMMENT:
            return Object.assign({}, newState, {[action.comment.data._id]: action.comment.data})
        case RECEIVE_USER_COMMENT:
            return Object.assign({}, newState, {[action.comment.data._id]: action.comment.data})
        case RECEIVE_USER_COMMENTS:
            // for (let j = 0; j < action.user.data.length; j++) {
            //     newState[action.user.data[j]._id] = action.user.data[j]
            // }
            // return newState; 
        default: 
            return state
    }
}

export default CommentsReducer; 