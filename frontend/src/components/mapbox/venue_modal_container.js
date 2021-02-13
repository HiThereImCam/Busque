import { connect } from "react-redux";
import { createVenue, closeVenueModal } from "../../actions/venue_actions";
import { clearErrors } from "../../actions/session_actions";
import VenueModal from "../mapbox/venue_modal";

const mapStateToProps = (state) => ({
  venueModal: state.venueModal,
  setVenueCoordinates: state.setVenueCoordinates,
  errors: state.errors.session,
  currentUser: state.session.user.id,
});

const mapDispatchToProps = (dispatch) => ({
  createVenue: (venue, currentUser) =>
    dispatch(createVenue(venue, currentUser)),
  closeVenueModal: () => dispatch(closeVenueModal(false)),
  // clearErrors: () => dispatch(clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(VenueModal);
