import { connect } from "react-redux";
import MainPage from "./main_page";
import { openNavModal } from "../../actions/nav_actions";


const mapDispatchToProps = (dispatch) => ({
  openNavModal: () => dispatch(openNavModal(true)),
});

export default connect(null, mapDispatchToProps)(MainPage);
