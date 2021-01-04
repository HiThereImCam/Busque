import React from 'react';

class UserShow extends React.Component {

    componentDidMount() {
        this.props.fetchUser(this.props.match.params.userId)
    }

    render() {
        if (this.props.user === undefined) {
            return null;
        } else {
            const { user } = this.props.user;
            return (
                <div>
                    <div>{user.username}</div>
                    <div>{user.performerType}</div>
                    <div>{user.bio}</div>
                    <img src={user.imageURL} />
                </div>
            )
        }
    }
}

export default UserShow;