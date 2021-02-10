import { connect } from "react-redux";
import { fetchUser, fetchUserRatings, createUserRating, fetchUserComments, createUserComment } from "../../actions/user_actions";
import UserShow from "./user_show";
import { openNavModal } from "../../actions/nav_actions";

const mSTP = (state, ownProps) => ({
  user: state.entities.users[ownProps.match.params.userId],
  currentUser: state.session.user,
  ratings: Object.values(state.ratings), 
  isAuthenticated: state.session.isAuthenticated,
  comments: Object.values(state.comments)
});

const mDTP = (dispatch) => ({
  fetchUser: (userId) => dispatch(fetchUser(userId)),
  openNavModal: () => dispatch(openNavModal(true)),
  fetchUserComments: (userId) => dispatch(fetchUserComments(userId)),
  createUserComment: (userId, comment, commenter) => dispatch(createUserComment(userId, comment, commenter)),
  fetchUserRatings: (userId) => (dispatch(fetchUserRatings(userId))),
  createUserRating: (userId, rating, user) => dispatch(createUserRating(userId, rating, user)), 
});

export default connect(mSTP, mDTP)(UserShow);
