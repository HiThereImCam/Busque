import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Searchbar from "../searchbar/searchbar";
import "../../css/user_show.css";

class UserShow extends React.Component {
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
  }

  render() {
    if (this.props.user === undefined) {
      return null;
    } else {
      const user = this.props.user;

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
            <Searchbar />
            <Link className="user-header-h1" to={"/"}>
              <h1>Busque</h1>
            </Link>
          </div>

          <div className="user-show-info-list">
            <div className="user-show-photo-outer">
              <div className="user-show-photo">
                <img src={user.imageURL} alt="profile" />
              </div>
            </div>
            <div className="user-show-info">
              <div className="user-show-username">{user.username}</div>
              <div className="user-show-performer-type">
                Performer Type: {user.performerType}
              </div>
              <div className="user-show-bio">Bio: {user.bio}</div>
            </div>
          </div>
          <div className="user-reviews">
            <h2>Reviews</h2>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(UserShow);
