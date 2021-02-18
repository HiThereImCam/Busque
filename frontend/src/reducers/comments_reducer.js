import { RECEIVE_ALL_COMMENTS, RECEIVE_USER_COMMENTS, RECEIVE_VENUE_COMMENTS, CREATE_COMMENT, REMOVE_COMMENT } from '../actions/comment_actions'; 

const CommentsReducer = (state = {}, action) => {
    Object.freeze(state); 
    let newState = Object.assign({}, state);

    switch(action.type) {
        case RECEIVE_ALL_COMMENTS: 
            for (let i = 0; i < action.comments.data.length; i++) {
                newState[action.comments.data[i]._id] = action.comments.data[i]
            }
            return newState; 
        case RECEIVE_USER_COMMENTS:
            for (let j = 0; j < action.comments.data.length; j++) {
                newState[action.comments.data[j]._id] = action.comments.data[j]
            }
            return newState; 
        case RECEIVE_VENUE_COMMENTS:
            for (let k = 0; k < action.comments.data.length; k++) {
                newState[action.comments.data[k]._id] = action.comments.data[k]
            }
            return newState;
        case CREATE_COMMENT: 
            return Object.assign(newState, {[action.comment.data._id]: action.comment.data})
        case REMOVE_COMMENT: 
            delete newState[action.commentId.data._id]
            return newState; 
        default: 
            return state
    }
}

export default CommentsReducer; 