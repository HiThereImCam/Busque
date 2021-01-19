import { connect } from 'react-redux';
import { fetchUser } from '../../actions/user_actions';
import UserShow from './user_show';
import { openNavModal } from "../../actions/nav_actions";


const mSTP = (state, ownProps) => ({
    user: state.entities.users[ownProps.match.params.userId],
    currentUser: state.session.user
});

const mDTP = (dispatch) => ({
    fetchUser: (userId) => (dispatch(fetchUser(userId))),
    openNavModal: () => dispatch(openNavModal(true)),
});

export default connect(mSTP, mDTP)(UserShow);