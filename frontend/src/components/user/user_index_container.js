import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/user_actions';
import { fetchAllLikes, fetchUserLikes, createLike, deleteLike } from '../../actions/like_actions'; 
import { fetchAllRatings, createRating } from '../../actions/rating_actions';
import UserIndex from './user_index';
import { openNavModal } from "../../actions/nav_actions";


const mapStateToProps = (state) => ({
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.user.id, 
    users: Object.values(state.entities.users), 
    ratings: Object.values(state.ratings), 
    likes: state.likes //object
});

const mapDispatchToProps = (dispatch) => ({
    fetchUsers: () => (dispatch(fetchUsers())),
    openNavModal: () => dispatch(openNavModal(true)),
    fetchAllRatings: () => (dispatch(fetchAllRatings())),
    createRating: (rating) => dispatch(createRating(rating)), 
    fetchAllLikes: () => dispatch(fetchAllLikes()),
    fetchUserLikes: (userId) => dispatch(fetchUserLikes(userId)),
    createLike: (like) => dispatch(createLike(like)),
    deleteLike: (likeId) => dispatch(deleteLike(likeId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserIndex);