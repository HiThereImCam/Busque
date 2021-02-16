import * as UserAPIUtil from "../util/user_api_util";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USER_COMMENTS = "RECEIVE_USER_COMMENTS";
export const RECEIVE_USER_COMMENT = "RECEIVE_USER_COMMENT";
export const RECEIVE_USER_RATING = "GET_USER_RATING";
export const RECEIVE_USER_RATINGS = "GET_USER_RATINGS";
export const RECEIVE_ALL_USER_LIKES = "RECEIVE_ALL_USER_LIKES";
export const RECEIVE_USER_LIKES = "RECEIVE_USER_LIKES";
export const CREATE_USER_LIKE = "CREATE_USER_LIKE";
export const UPDATE_USER_LIKE = "UPDATE_USER_LIKE";
export const REMOVE_USER_LIKE = "REMOVE_USER_LIKE";
export const CHECK_USER_IN = "CHECK_USER_IN";

const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users,
});

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
});

const receiveUserComments = (user, comments) => ({
  type: RECEIVE_USER_COMMENTS,
  user,
  comments,
});

const receiveUserComment = (comment) => ({
  type: RECEIVE_USER_COMMENT,
  comment,
});

const receiveRating = (rating) => ({
  type: RECEIVE_USER_RATING,
  rating,
});

const receiveRatings = (ratings) => ({
  type: RECEIVE_USER_RATINGS,
  ratings,
});

const receiveAllUserLikes = (likes) => ({
  type: RECEIVE_ALL_USER_LIKES,
  likes,
});

const receiveUserLikes = (user, likes) => ({
  type: RECEIVE_USER_LIKES,
  user,
  likes,
});

const receiveUserLike = (like) => ({
  type: CREATE_USER_LIKE,
  like,
});

//update?

const deleteUserLike = (like) => ({
  type: REMOVE_USER_LIKE, 
  like
})

export const checkUserIn = (value) => ({
  type: CHECK_USER_IN,
  value,
});

export const fetchUsers = () => (dispatch) => {
  return UserAPIUtil.getUsers()
    .then((users) => dispatch(receiveUsers(users)))
    .catch((err) => console.log(err));
};

export const fetchUser = (userId) => (dispatch) => {
  return UserAPIUtil.getUser(userId)
    .then((user) => dispatch(receiveUser(user)))
    .catch((err) => console.log(err));
};

export const fetchUserComments = (userId) => (dispatch) => {
  UserAPIUtil.getUserComments(userId)
    .then((userId, comments) => dispatch(receiveUserComments(userId, comments)))
    .catch((err) => console.log(err));
};

export const createUserComment = (userId, comment, commenter) => (dispatch) => {
  return UserAPIUtil.createUserComment(userId, comment, commenter)
    .then((comment) => dispatch(receiveUserComment(comment)))
    .catch((err) => console.log(err));
};

export const createUserRating = (userId, rating) => (dispatch) => {
  return UserAPIUtil.createRating(userId, rating)
    .then((rating) => dispatch(receiveRating(rating)))
    .catch((err) => console.log(err));
};

export const fetchUserRatings = (userId) => (dispatch) => {
  return UserAPIUtil.getUserRatings(userId)
    .then((ratings) => dispatch(receiveRatings(ratings)))
    .catch((err) => console.log(err));
};

export const fetchAllUserLikes = () => (dispatch) => {
  return UserAPIUtil.getAllUserLikes()
    .then((likes) => dispatch(receiveAllUserLikes(likes)))
    .catch((err) => console.log(err));
};

export const fetchUserLikes = (userId) => (dispatch) => {
  return UserAPIUtil.getUserLikes(userId)
    .then((user, likes) => dispatch(receiveUserLikes(user, likes)))
    .catch((err) => console.log(err));
};

export const createUserLike = (userId, likerId) => (dispatch) => {
  return UserAPIUtil.createUserLike(userId, likerId)
    .then((like) => dispatch(receiveUserLike(like)))
    .catch((err) => console.log(err));
};

//update?

export const removeUserLike = (userId, likerId) => (dispatch) => {
  return UserAPIUtil.deleteUserLike(userId, likerId)
    .then(like => dispatch(deleteUserLike(like)))
    .catch(err => console.log(err))
};
