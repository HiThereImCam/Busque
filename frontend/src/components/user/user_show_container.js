import { connect } from 'react-redux';
import { fetchUser } from '../../actions/user_actions';
import UserShow from './user_show';

const mSTP = (state, ownProps) => ({
    user: state.entities.users[ownProps.match.params.userId]
    // currentUser: state.session.user
});

const mDTP = (dispatch) => ({
    fetchUser: (userId) => (dispatch(fetchUser(userId)))
});

export default connect(mSTP, mDTP)(UserShow);