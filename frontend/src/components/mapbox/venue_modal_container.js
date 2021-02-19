import { connect } from "react-redux";
import {
  createVenue,
  closeVenueModal,
  openVenueModal,
} from "../../actions/venue_actions";
import { clearErrors } from "../../actions/session_actions";
import VenueModal from "../mapbox/venue_modal";

const mapStateToProps = (state) => ({
  venueModal: state.venueModal,
  coordinates: state.setVenueNameAndCoordinates.coordinates,
  venueName: state.setVenueNameAndCoordinates.venueName,
  errors: state.errors.session,
  currentUser: state.session.user.id,
});

const mapDispatchToProps = (dispatch) => ({
  createVenue: (venue, currentUser) =>
    dispatch(createVenue(venue, currentUser)),
  closeVenueModal: () => dispatch(closeVenueModal(false)),
  openVenueModal: () => dispatch(openVenueModal(true)),
  clearErrors: () => dispatch(clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(VenueModal);
