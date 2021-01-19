import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/user_actions';
import UserIndex from './user_index';
import { openNavModal } from "../../actions/nav_actions";


const mapStateToProps = (state) => ({
    // user: Object.assign({}, state.entities.users.data)
    users: Object.values(state.entities.users), 
});

const mapDispatchToProps = (dispatch) => ({
    fetchUsers: () => (dispatch(fetchUsers())),
    openNavModal: () => dispatch(openNavModal(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserIndex);