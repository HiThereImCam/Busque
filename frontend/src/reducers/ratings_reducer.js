import { RECEIVE_USER_RATINGS, RECEIVE_USER_RATING } from '../actions/user_actions';

const ratingsReducer = (state = {}, action) => {
    Object.freeze(state); 
    let newState = Object.assign({}, state)

    switch(action.type) {
        case RECEIVE_USER_RATINGS:
            for (let i = 0; i < action.ratings.data.length; i++) {
                newState[action.ratings.data[i]._id] = action.ratings.data[i]
            }
            return newState; 
        case RECEIVE_USER_RATING:
            return Object.assign({}, newState, { [action.rating.data._id]: action.rating.data.ratings })
        default:
            return state;
    }
}

export default ratingsReducer; 