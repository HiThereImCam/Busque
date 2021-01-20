import { connect } from "react-redux";
import { fetchVenues } from "../../actions/venue_actions";
import { openNavModal } from "../../actions/nav_actions";
import { fetchUsers } from "../../actions/user_actions";
import { checkIn } from "../../actions/venue_actions";

import MapBox from "./mapbox";

const mapStateToProps = (state) => ({
  venues: state.venues,
  users: state.entities.users,
  isAuthenticated: state.session.isAuthenticated,
  currentUser: state.session.user.id,
});

const mapDispatchToProps = (dispatch) => ({
  fetchVenues: () => dispatch(fetchVenues()),
  openNavModal: () => dispatch(openNavModal(true)),
  fetchUsers: () => dispatch(fetchUsers()),
  checkIn: (venueID, currentUser) => dispatch(checkIn(venueID, currentUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapBox);
