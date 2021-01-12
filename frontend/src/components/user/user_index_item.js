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
                
            </div>
        )
    }
}

export default UserIndexItem;