import { connect } from 'react-redux';
import { fetchUsers, fetchUserRatings, createUserRating } from '../../actions/user_actions';
import { fetchAllLikes, fetchUserLikes, createLike, deleteLike } from '../../actions/like_actions'; 
import UserIndex from './user_index';
import { openNavModal } from "../../actions/nav_actions";


const mapStateToProps = (state) => ({
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.user.id, 
    users: Object.values(state.entities.users), 
    ratings: Object.values(state.ratings), 
    likes: (state.likes)
});

const mapDispatchToProps = (dispatch) => ({
    fetchUsers: () => (dispatch(fetchUsers())),
    openNavModal: () => dispatch(openNavModal(true)),
    fetchUserRatings: (userId) => (dispatch(fetchUserRatings(userId))),
    createUserRating: (userId, rating, user) => dispatch(createUserRating(userId, rating, user)), 
    fetchAllLikes: () => dispatch(fetchAllLikes()),
    fetchUserLikes: (userId) => dispatch(fetchUserLikes(userId)),
    createLike: (like) => dispatch(createLike(like)),
    deleteLike: (likeId) => dispatch(deleteLike(likeId)),
    // editUserLike: (userId, likeId) => dispatch(editUserLike(userId, likeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserIndex);