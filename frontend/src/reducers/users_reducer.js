import { RECEIVE_CURRENT_USER } from '../actions/session_actions'; 
import { RECEIVE_USER, RECEIVE_USERS, RECEIVE_USER_COMMENT } from '../actions/user_actions';
import { formatUsers } from './selectors'; 
import { CREATE_VENUE_LIKE } from '../actions/venue_actions';

const usersReducer = (state = {}, action) => {
    Object.freeze(state); 

    switch(action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, state, { [action.currentUser.id]: action.currentUser });
        case RECEIVE_USER:
            return Object.assign({}, state, { [action.user.data._id]: action.user.data }); 
        case RECEIVE_USERS:
            return Object.assign({}, state, formatUsers(action.users.data)); 
        case RECEIVE_USER_COMMENT:
            let wholeUser = state[action.comment.data.user]
            wholeUser.comments.push(action.comment.data._id)
            return state; 
        case CREATE_VENUE_LIKE:
            let userLike = state[action.like.data.likerId]
            let likedArr = userLike.liked
            likedArr.push(action.like.data._id)
        default: 
            return state; 
    }
}; 

export default usersReducer; 