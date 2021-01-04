import { connect } from "react-redux";
import MainPage from "./main_page";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  closeNavModal: () => dispatch(closeNavModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
