import React from 'react';
import { withRouter } from "react-router-dom";

class UserShow extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchUser(this.props.match.params.userId)
    }

    render() {
        if (this.props.user === undefined) {
            return null;
        } else {
            const user = this.props.user;

            return (
                <div>
                    <h1>hello</h1>
                    <img src={user.imageURL} alt="photo" />
                    <div>{user.username}</div>
                    <div>{user.performerType}</div>
                    <div>{user.bio}</div>
                </div>
            )
        }
    }
}

export default withRouter(UserShow);