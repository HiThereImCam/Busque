import React from 'react'; 
import UserIndexItem from './user_index_item';
import "../../css/user_index.css";
import { GiHamburgerMenu } from "react-icons/gi";

class UserIndex extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    return (
      <div>
        <div className="user-header">
          <GiHamburgerMenu
            size={25}
            onClick={() => {
              this.props.openNavModal();
            }}
            className="menu-icon-other"
          />
          <h1>Our Artists</h1>
        </div>
        {this.props.users.map((user, i) => {
          return <UserIndexItem user={user} key={i} />;
        })}
      </div>
    );
  }
}

export default UserIndex;
