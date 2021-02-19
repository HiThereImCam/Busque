import { connect } from "react-redux";
import { fetchUser, fetchUsers } from "../../actions/user_actions";
import { fetchAllLikes, fetchUserLikes, createLike, deleteLike } from '../../actions/like_actions'; 
import { fetchAllComments, fetchUserComments, createComment, deleteComment, updateComment } from '../../actions/comment_actions';

import UserShow from "./user_show";
import { openNavModal } from "../../actions/nav_actions";

const mSTP = (state, ownProps) => ({
  user: state.entities.users[ownProps.match.params.userId],
  currentUser: state.session.user,
  ratings: Object.values(state.ratings), 
  isAuthenticated: state.session.isAuthenticated,
  comments: Object.values(state.comments), 
  likes: state.likes, 
  users: state.entities.users
});

const mDTP = (dispatch) => ({
  fetchUser: (userId) => dispatch(fetchUser(userId)),
  fetchUsers: () => dispatch(fetchUsers()),
  openNavModal: () => dispatch(openNavModal(true)),
  fetchAllComments: () => dispatch(fetchAllComments()),
  fetchUserComments: (userId) => dispatch(fetchUserComments(userId)),
  createComment: (comment) => dispatch(createComment(comment)),
  deleteComment: (commentId) => dispatch(deleteComment(commentId)),
  updateComment: (comment) => dispatch(updateComment(comment)),
  // fetchUserRatings: (userId) => (dispatch(fetchUserRatings(userId))),
  // createUserRating: (userId, rating, user) => dispatch(createUserRating(userId, rating, user)), 
  fetchAllLikes: () => dispatch(fetchAllLikes()),
  fetchUserLikes: (userId) => dispatch(fetchUserLikes(userId)),
  createLike: (like) => dispatch(createLike(like)),
  deleteLike: (likeId) => dispatch(deleteLike(likeId)),
});

export default connect(mSTP, mDTP)(UserShow);
