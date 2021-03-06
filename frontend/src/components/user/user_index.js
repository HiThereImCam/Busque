import React from "react";
import UserIndexItem from "./user_index_item";
import "../../css/user_index.css";
import Searchbar from "../searchbar/searchbar_container";

class UserIndex extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchAllLikes(); 
    this.props.fetchAllRatings();
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
                currentUser={this.props.currentUser}
                createRating={this.props.createRating}
                ratings={this.props.ratings}
                likes={this.props.likes}
                createLike={this.props.createLike}
                deleteLike={this.props.deleteLike}
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
