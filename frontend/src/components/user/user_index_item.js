import React from 'react'; 
import { Link } from 'react-router-dom'; 

class UserIndexItem extends React.Component {

    render() {
        if (!this.props.user) {
            return null; 
        }

        return (
            <div>
                <Link to={`/profile/${this.props.user._id}`}>
                    <img src={this.props.user.imageURL} alt="profile" />
                </Link>
                <br/>
                <Link to={`/profile/${this.props.user._id}`}>
                    {this.props.user.username}
                </Link>
                <div>
                    {this.props.user.performerType}
                </div>
                <div>
                    {this.props.user.bio}
                </div>
            </div>
        )
    }
}

export default UserIndexItem;