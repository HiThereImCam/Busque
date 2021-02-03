import { connect } from "react-redux";
import { fetchUser, fetchUserRatings, createUserRating } from "../../actions/user_actions";
import UserShow from "./user_show";
import { openNavModal } from "../../actions/nav_actions";

const mSTP = (state, ownProps) => ({
  user: state.entities.users[ownProps.match.params.userId],
  currentUser: state.session.user,
  ratings: Object.values(state.ratings)
});

const mDTP = (dispatch) => ({
  fetchUser: (userId) => dispatch(fetchUser(userId)),
  openNavModal: () => dispatch(openNavModal(true)),
  fetchUserRatings: (userId) => (dispatch(fetchUserRatings(userId))),
  createUserRating: (userId, rating, user) => dispatch(createUserRating(userId, rating, user)), 
});

export default connect(mSTP, mDTP)(UserShow);
