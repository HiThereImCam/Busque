import { connect } from "react-redux";
import { fetchVenues } from "../../actions/venue_actions";
import MapBox from "./mapbox";

const mapStateToProps = (state) => (
  console.log("state", state),
  {
    venues: state.venues,
  }
);

const mapDispatchToProps = (dispatch) => ({
  fetchVenues: () => dispatch(fetchVenues()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapBox);
