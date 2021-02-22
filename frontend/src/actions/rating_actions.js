import * as RatingAPIUtil from '../util/rating_api_util';

export const RECEIVE_ALL_RATINGS = "RECEIVE_ALL_RATINGS"; 
export const RECEIVE_RATINGS = "RECEIVE_RATINGS"; 
export const CREATE_RATING = "CREATE_RATING"; 
export const REMOVE_RATING = "REMOVE_RATING"; 

const receiveAllRatings = (ratings) => ({
    type: RECEIVE_ALL_RATINGS, 
    ratings
}); 

const receiveRatings = (ratings) => ({
    type: RECEIVE_RATINGS, 
    ratings
}); 

const receiveRating = (rating) => ({
    type: CREATE_RATING, 
    rating
}); 

const removeRating = (ratingId) => ({
    type: REMOVE_RATING, 
    ratingId
})

export const fetchAllRatings = () => (dispatch) => {
    return RatingAPIUtil.getAllRatings()
        .then((ratings) => dispatch(receiveAllRatings(ratings)))
        .catch((err) => console.log(err))
}; 

export const fetchRatings = (id) => (dispatch) => {
    return RatingAPIUtil.getRatings(id)
        .then((ratings) => dispatch(receiveRatings(ratings)))
        .catch((err) => console.log(err))
}; 

export const createRating = (rating) => (dispatch) => {
    return RatingAPIUtil.createRating(rating)
        .then((rating) => dispatch(receiveRating(rating)))
        .catch((err) => console.log(err))
}; 

export const deleteRating = (ratingId) => (dispatch) => {
    return RatingAPIUtil.deleteRating(ratingId)
        .then((ratingId) => dispatch(removeRating(ratingId)))
        .catch((err) => console.log(err))
}; 