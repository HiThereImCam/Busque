import { RECEIVE_CURRENT_USER } from '../actions/session_actions'; 
import { RECEIVE_USER, RECEIVE_USERS, RECEIVE_USER_COMMENT, RECEIVE_USER_COMMENTS } from '../actions/user_actions';
import { formatUsers } from './selectors'; 
import { CREATE_VENUE_LIKE, REMOVE_VENUE_LIKE } from '../actions/venue_actions';
import { CREATE_USER_LIKE } from '../actions/user_actions'; 

const usersReducer = (state = {}, action) => {
    Object.freeze(state); 
    let newState = Object.assign({}, state)

    switch(action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, state, { [action.currentUser.id]: action.currentUser });
        case RECEIVE_USER:
            return Object.assign({}, state, { [action.user.data._id]: action.user.data }); 
        case RECEIVE_USERS:
            return Object.assign({}, state, formatUsers(action.users.data)); 
        // case RECEIVE_USER_COMMENTS:

        case RECEIVE_USER_COMMENT:
            let wholeUser = newState[action.comment.data.user]
            wholeUser.comments.push(action.comment.data._id)
            return newState; 
        case CREATE_USER_LIKE: 
            let userLike = newState[action.like.data.likerId]
            let likedUserArr = userLike.liked
            likedUserArr.push(action.like.data._id)
            let likedUser = newState[action.like.data.userId]
            likedUser.likes++
            return newState
        case CREATE_VENUE_LIKE:
            let userVenueLike = newState[action.like.data.likerId]
            let likedArr = userVenueLike.liked
            likedArr.push(action.like.data._id)
            return newState; 
        case REMOVE_VENUE_LIKE:
            console.log(newState)
            let liker = newState[action.likeId.config.likerId]
            for (let i = 0; i < liker.liked.length; i++) {
                if (liker.liked[i] === action.likeId.config.likeId) {
                    delete liker.liked[i]
                }
            }
            return newState;
        default: 
            return state; 
    }
}; 

export default usersReducer; 