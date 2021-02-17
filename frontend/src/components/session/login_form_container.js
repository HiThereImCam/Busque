import { connect } from "react-redux";
import { login, clearErrors } from "../../actions/session_actions";
import LoginForm from "./login_form";
import { openNavModal } from "../../actions/nav_actions";

const mapStateToProps = (state) => ({
  errors: state.errors.session,
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(login(user)),
  clearErrors: () => dispatch(clearErrors()),
  openNavModal: () => dispatch(openNavModal(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
