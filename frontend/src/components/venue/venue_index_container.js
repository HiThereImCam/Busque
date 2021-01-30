import { connect } from 'react-redux';
import VenueIndex from './venue_index'; 
import { openNavModal } from '../../actions/nav_actions'; 
import { fetchVenues, createComment, fetchVenueComments } from '../../actions/venue_actions';
import { fetchUsers } from '../../actions/user_actions'; 

const mapStateToProps = (state) => ({
    venues: Object.values(state.venues), 
    users: Object.values(state.entities.users), 
    comments: Object.values(state.comments),
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.user.id 
});

const mapDispatchToProps = (dispatch) => ({
    fetchVenues: () => dispatch(fetchVenues()), 
    openNavModal: () => dispatch(openNavModal(true)),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchVenueComments: (venueId) => dispatch(fetchVenueComments(venueId)),
    createComment: (venueId, comment, user) => dispatch(createComment(venueId, comment, user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VenueIndex); 
