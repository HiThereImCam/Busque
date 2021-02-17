import { connect } from "react-redux";
import { fetchUser } from "../../actions/user_actions";
import Engineers from "./engineers";
import { openNavModal } from "../../actions/nav_actions";

const mSTP = (state, ownProps) => ({
});

const mDTP = (dispatch) => ({
  openNavModal: () => dispatch(openNavModal(true)),
});

export default connect(mSTP, mDTP)(Engineers);