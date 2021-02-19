import { RECEIVE_ALL_RATINGS, CREATE_RATING } from '../actions/rating_actions';

const ratingsReducer = (state = {}, action) => {
    Object.freeze(state); 
    let newState = Object.assign({}, state)

    switch(action.type) {
        case RECEIVE_ALL_RATINGS:
            for (let i = 0; i < action.ratings.data.length; i++) {
                newState[action.ratings.data[i]._id] = action.ratings.data[i]
            }
            return newState; 
        case CREATE_RATING:
            return Object.assign({}, newState, { [action.rating.data._id]: action.rating.data })
        default:
            return state;
    }
}

export default ratingsReducer; 