import React from "react";
import UserIndexItem from "./user_index_item";
import "../../css/user_index.css";
import { GiHamburgerMenu } from "react-icons/gi";
import Searchbar from "../searchbar/searchbar";

class UserIndex extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    return (
      <div>
        <div className="user-header-container">
          <div className="user-search-container">
            <div className="user-search">
              <GiHamburgerMenu
                size={25}
                onClick={() => {
                  this.props.openNavModal();
                }}
                className="menu-icon-other"
              />

              <Searchbar users={this.props.users} />
            </div>
          </div>
          <div className="user-header">
            <h1>Our Artists</h1>
          </div>
        </div>
        {this.props.users.map((user, i) => {
          return <UserIndexItem user={user} key={i} />;
        })}
      </div>
    );
  }
}

export default UserIndex;
