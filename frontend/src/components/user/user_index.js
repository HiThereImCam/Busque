import React from 'react'; 
import UserIndexItem from './user_index_item';
import "../../css/user_index.css";


class UserIndex extends React.Component {

    componentDidMount() {
        this.props.fetchUsers(); 
    }

    render() {
        return (
            <div>
                <div className="user-index-header">
                    <h1>Our Artists</h1>
                </div>
                {this.props.users.map((user, i) => {
                    return <UserIndexItem user={user} key={i}/>
                })}
            </div>
        )
    }
}

export default UserIndex; 