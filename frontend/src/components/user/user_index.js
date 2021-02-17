import React from "react";
import UserIndexItem from "./user_index_item";
import "../../css/user_index.css";
import Searchbar from "../searchbar/searchbar_container";

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
              <Searchbar
                users={this.props.users}
                openModal={this.props.openNavModal}
              />
            </div>
          </div>
          <div className="user-header">
            <h1>Our Artists</h1>
          </div>
        </div>
        <div className="user-index-container">
          {this.props.users.map((user, i) => {
            return (
              <UserIndexItem
                user={user}
                // isAuthenticated={this.props.isAuthenticated}
                currentUser={this.props.currentUser}
                createUserRating={this.props.createUserRating}
                fetchUserRatings={this.props.fetchUserRatings}
                ratings={this.props.ratings}
                likes={this.props.likes}
                fetchUserLikes={this.props.fetchUserLikes}
                createUserLike={this.props.createUserLike}
                removeUserLike={this.props.removeUserLike}
                editUserLike={this.props.editUserLike}
                key={i}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default UserIndex;
