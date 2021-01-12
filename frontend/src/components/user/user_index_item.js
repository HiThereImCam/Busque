import React from 'react'; 
import { Link } from 'react-router-dom'; 

class UserIndexItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (!this.props.user) {
            return null; 
        }

        return (
            <div>
                <h1>User Index Item</h1>
                <Link to={`/profile/${this.props.user._id}`}>
                    {this.props.user.username}
                </Link>
            </div>
        )
    }
}

export default UserIndexItem;