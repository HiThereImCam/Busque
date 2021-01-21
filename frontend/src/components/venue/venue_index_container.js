import { connect } from 'react-redux';
import VenueIndex from './venue_index'; 
import { openNavModal } from '../../actions/nav_actions'; 
import { fetchVenues } from '../../actions/venue_actions';

const mapStateToProps = (state) => ({
    venues: state.venues
});

const mapDispatchToProps = (dispatch) => ({
    fetchVenues: () => (dispatch(fetchVenues())), 
    openNavModal: () => dispatch(openNavModal(true)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(VenueIndex); 
