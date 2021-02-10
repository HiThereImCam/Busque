import { connect } from "react-redux";
import { openNavModal, closeNavModal } from "../../actions/nav_actions";
import Searchbar from "./searchbar";
import {logout} from '../../actions/session_actions'


const mapStateToProps = (state) => {
  return {
    currentUser: state.session.user.id
  };
};

const mapDispatchToProps = (dispatch) => ({
  openModal: () => dispatch(openNavModal(true)),
  closeNavModal: () => dispatch(closeNavModal(false)),
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
