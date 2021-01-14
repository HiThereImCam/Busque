import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/user_actions';
import UserIndex from './user_index';

const mapStateToProps = (state) => ({
    // user: Object.assign({}, state.entities.users.data)
    users: Object.values(state.entities.users)
});

const mapDispatchToProps = (dispatch) => ({
    fetchUsers: () => (dispatch(fetchUsers()))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserIndex);