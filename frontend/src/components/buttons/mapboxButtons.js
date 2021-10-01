import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { openVenueModal } from "../../actions/venue_actions";

function MapboxButtons(props) {
  console.log("MAPBOX BUTTONS PROPS: ", props);
  const [authentication] = props;
  const history = useHistory();
  const redirectToLogin = () => {
    history.push("/login");
  };

  if (authentication) {
    return <button onClick={openVenueModal}>Create new venue</button>;
  } else {
    return (
      <button onClick={redirectToLogin}>Login to create a new venue</button>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  openVenueModal: () => dispatch(openVenueModal(true)),
});

export default connect(mapDispatchToProps)(MapboxButtons);
