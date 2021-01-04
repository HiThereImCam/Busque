import { connect } from "react-redux";
import MainPage from "./main_page";
import { openNavModal } from "../../actions/nav_actions";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
<<<<<<< HEAD
  closeNavModal: () => dispatch(closeNavModal()),
=======
  openNavModal: () => dispatch(openNavModal(true)),
>>>>>>> efd5fb9276319601d4549536bc83bfcaa06b0a99
});

export default connect(null, mapDispatchToProps)(MainPage);
