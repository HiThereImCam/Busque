import { connect } from "react-redux";
import Splash from "./splash";
const mapStateToProps = (state) => ({
  isAuthenticated: state.session.isAuthenticated,
});

export default connect(mapStateToProps, null)(Splash);
