import React from 'react'; 
import UserIndexItem from './user_index_item';

class UserIndex extends React.Component {

    componentDidMount() {
        this.props.fetchUsers(); 
    }

    render() {
        return (
            <div>
                <h1>Our Artists</h1>
                {this.props.users.map((user, i) => {
                    return <UserIndexItem user={user} key={i}/>
                })}
            </div>
        )
    }
}

export default UserIndex; 