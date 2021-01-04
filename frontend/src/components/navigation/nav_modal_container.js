import { connect } from "react-redux";
import { closeNavModal } from "../../actions/nav_actions";
import NavModal from "./nav_modal";

const mapStateToProps = (state) => {
  return {
    openNavModal: state.nav,
  };
};

const mapDispatchToProps = (dispatch) => ({
  closeNavModal: () => dispatch(closeNavModal(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavModal);
