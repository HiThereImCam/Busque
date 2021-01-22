import { connect } from "react-redux";
import { closeNavModal } from "../../actions/nav_actions";
import NavModal from "./nav_modal";
import {logout} from '../../actions/session_actions'
const mapStateToProps = (state) => {
  return {
    openNavModal: state.nav,
    currentUser: state.session.user.id
  };
};

const mapDispatchToProps = (dispatch) => ({
  closeNavModal: () => dispatch(closeNavModal(false)),
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavModal);
