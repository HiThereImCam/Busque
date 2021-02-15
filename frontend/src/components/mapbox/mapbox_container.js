import { connect } from "react-redux";
import {
  fetchVenues,
  checkIn,
  setVenNameAndCoord,
} from "../../actions/venue_actions";
import { openNavModal } from "../../actions/nav_actions";
import { fetchUsers, checkUserIn } from "../../actions/user_actions";
import { openVenueModal } from "../../actions/venue_actions";
import MapBox from "./mapbox";

//checkOut

const mapStateToProps = (state) => ({
  venueModal: state.venueModal,
  venues: state.venues,
  users: state.entities.users,
  isAuthenticated: state.session.isAuthenticated,
  currentUser: state.session.user.id,
  userCheckedIn: state.session.userCheckedIn,
});

const mapDispatchToProps = (dispatch) => ({
  fetchVenues: () => dispatch(fetchVenues()),
  openNavModal: () => dispatch(openNavModal(true)),
  openVenueModal: () => dispatch(openVenueModal(true)),
  fetchUsers: () => dispatch(fetchUsers()),
  checkIn: (venueID, currentUser) => dispatch(checkIn(venueID, currentUser)),
  checkUserIn: () => dispatch(checkUserIn(true)),
  setVenNameAndCoordinate: (venNameAndCoord) =>
    dispatch(setVenNameAndCoord(venNameAndCoord)),
  // checkOut: () => dispatch(checkOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapBox);
