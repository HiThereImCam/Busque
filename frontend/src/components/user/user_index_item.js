import React from 'react'; 
import { Link } from 'react-router-dom'; 
import "../../css/user_index.css";

class UserIndexItem extends React.Component {

    render() {
        if (!this.props.user) {
            return null; 
        }

        return (
            <div className="user-list-items-outer">
                {/* <div className="user-list-items-inner"> */}
                    <div className="user-list-items">
                        <Link className="user-photo" to={`/profile/${this.props.user._id}`}>
                            <img src={this.props.user.imageURL} alt="profile" />
                        </Link>
                        <br/>
                        <div className="user-info">
                            <div className="username-outer">
                                <Link className="user-username" to={`/profile/${this.props.user._id}`}>
                                    {this.props.user.username}
                                </Link>
                            </div>
                            <div className="performer-type">
                                Performer Type: {this.props.user.performerType}
                            </div>
                            <div className="bio">
                                Bio: {this.props.user.bio}
                            </div>
                        </div>
                    </div>
                {/* </div> */}
            </div>
        )
    }
}

export default UserIndexItem;