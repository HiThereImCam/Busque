import { connect } from "react-redux";
import {
  fetchVenues,
  checkIn,
  setVenueNameAndCoordinates,
} from "../../actions/venue_actions";
import { openNavModal } from "../../actions/nav_actions";
import { fetchUsers } from "../../actions/user_actions";
import { openVenueModal } from "../../actions/venue_actions";
// import MapBox from "./mapbox";
import Mapbox from "./useMapbox";

//checkOut

const mapStateToProps = (state) => ({
  venueModal: state.venueModal,
  venues: state.venues,
  users: state.entities.users,
  isAuthenticated: state.session.isAuthenticated,
  currentUser: state.session.user.id,
});

const mapDispatchToProps = (dispatch) => ({
  fetchVenues: () => dispatch(fetchVenues()),
  openNavModal: () => dispatch(openNavModal(true)),
  openVenueModal: () => dispatch(openVenueModal(true)),
  fetchUsers: () => dispatch(fetchUsers()),
  checkIn: (venueID, currentUser) => dispatch(checkIn(venueID, currentUser)),
  setVenueNameAndCoordinates: (venNameAndCoord) =>
    dispatch(setVenueNameAndCoordinates(venNameAndCoord)),
  // checkOut: () => dispatch(checkOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Mapbox);
