<<<<<<< HEAD
import { connect } from "react-redux";
import { fetchUser, fetchUsers } from "../../actions/user_actions";
import UserShow from "./user_show";
=======
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/user_actions';
import UserShow from './user_show';
import { openNavModal } from "../../actions/nav_actions";

>>>>>>> 10c0c386c0e7e02f3d6d5cfdb3f105390c474007

const mSTP = (state, ownProps) => ({
  user: state.entities.users[ownProps.match.params.userId],
  currentUser: state.session.user,
});

const mDTP = (dispatch) => ({
<<<<<<< HEAD
  fetchUser: (userId) => dispatch(fetchUser(userId)),
  fetchUsers: () => dispatch(fetchUsers()),
=======
    fetchUser: (userId) => (dispatch(fetchUser(userId))),
    openNavModal: () => dispatch(openNavModal(true)),
>>>>>>> 10c0c386c0e7e02f3d6d5cfdb3f105390c474007
});

export default connect(mSTP, mDTP)(UserShow);
