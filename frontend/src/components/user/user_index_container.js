import { connect } from 'react-redux';
import { fetchUsers, fetchUserRatings, createUserRating } from '../../actions/user_actions';
import UserIndex from './user_index';
import { openNavModal } from "../../actions/nav_actions";


const mapStateToProps = (state) => ({
    // user: Object.assign({}, state.entities.users.data)
    users: Object.values(state.entities.users), 
    ratings: Object.values(state.ratings)
});

const mapDispatchToProps = (dispatch) => ({
    fetchUsers: () => (dispatch(fetchUsers())),
    openNavModal: () => dispatch(openNavModal(true)),
    fetchUserRatings: (userId) => (dispatch(fetchUserRatings(userId))),
    createUserRating: (userId, rating, user) => dispatch(createUserRating(userId, rating, user)), 
});

export default connect(mapStateToProps, mapDispatchToProps)(UserIndex);