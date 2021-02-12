import { connect } from "react-redux";
import { createVenue, closeVenueModal } from "../../actions/venue_actions";
import { clearErrors } from "../../actions/session_actions";
import VenueModal from "../mapbox/venue_modal";

const mapStateToProps = (state) => ({
  venueModal: state.venueModal,
  errors: state.errors.session,
});

const mapDispatchToProps = (dispatch) => ({
  createVenue: (venue) => dispatch(createVenue(venue)),
  closeVenueModal: () => dispatch(closeVenueModal(false)),
  // clearErrors: () => dispatch(clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(VenueModal);
