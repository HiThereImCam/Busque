import { RECEIVE_CURRENT_USER } from '../actions/session_actions'; 
import { RECEIVE_USER, RECEIVE_USERS, RECEIVE_USER_COMMENT } from '../actions/user_actions';
import { formatUsers } from './selectors'; 

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
            console.log(state)
            let wholeUser = state[action.comment.data.user]
            console.log(wholeUser)
            wholeUser.comments.push(action.comment.data._id)
            return state; 
        default: 
            return state; 
    }
}; 

export default usersReducer; 