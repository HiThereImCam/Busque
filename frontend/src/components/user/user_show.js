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
            const user  = this.props.user;

            return (
                <div>
                    <h1>hello</h1>
                    {console.log(user)}
                    <div>{user.data.username}</div>
                    <div>{user.data.performerType}</div>
                    <div>{user.data.bio}</div>
                    <img src={user.data.imageURL} />
                </div>
            )
        }
    }
}

export default withRouter(UserShow);