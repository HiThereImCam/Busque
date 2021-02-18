import { connect } from 'react-redux';
import VenueIndex from './venue_index'; 
import { openNavModal } from '../../actions/nav_actions'; 
import { fetchVenues, fetchVenueRatings, createVenueRating } from '../../actions/venue_actions';
import { fetchAllLikes, fetchVenueLikes, createLike, deleteLike } from '../../actions/like_actions'; 
import { fetchAllComments, fetchVenueComments, createComment, deleteComment, updateComment } from '../../actions/comment_actions';
import { fetchUsers } from '../../actions/user_actions'; 

const mapStateToProps = (state) => ({
    venues: Object.values(state.venues), 
    users: state.entities.users, 
    comments: Object.values(state.comments),
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.user.id, 
    ratings: Object.values(state.ratings), 
    likes: state.likes
});

const mapDispatchToProps = (dispatch) => ({
    fetchVenues: () => dispatch(fetchVenues()), 
    openNavModal: () => dispatch(openNavModal(true)),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchAllComments: () => dispatch(fetchAllComments()),
    fetchVenueComments: (venueId) => dispatch(fetchVenueComments(venueId)),
    createComment: (comment) => dispatch(createComment(comment)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
    updateComment: (comment) => dispatch(updateComment(comment)),
    fetchVenueRatings: (venueId) => dispatch(fetchVenueRatings(venueId)), 
    createVenueRating: (venueId, rating, user) => dispatch(createVenueRating(venueId, rating, user)), 
    fetchAllLikes: () => dispatch(fetchAllLikes()),
    fetchVenueLikes: (venueId) => dispatch(fetchVenueLikes(venueId)),
    createLike: (like) => dispatch(createLike(like)), 
    deleteLike: (likeId) => dispatch(deleteLike(likeId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VenueIndex); 
