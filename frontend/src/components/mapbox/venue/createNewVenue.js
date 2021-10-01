import { connect } from "react-redux";
import { openVenueModal } from "../../actions/venue_actions";
import MapboxButtons from "../../buttons/mapboxButtons";
// setDOMContent(htmlNode)
// pass in a ref?

/**
 *
 * I think that this shouldn't have to check for authentication
 *
 *
 * @param {*} param0
 * @returns
 */

function createNewVenue({ isAuthenticated }) {
  return (
    <div>
      <MapboxButtons authentication={isAuthenticated} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.session.isAuthenticated,
});

export default connect(mapStateToProps)(createNewVenue);
