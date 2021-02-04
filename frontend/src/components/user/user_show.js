import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Searchbar from "../searchbar/searchbar";
import ReactStars from "react-rating-stars-component";
import "../../css/user_show.css";

class UserShow extends React.Component {
  constructor(props) {
    super(props);
    this.handleRating = this.handleRating.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
    this.props.fetchUserRatings(this.props.match.params.userId);
  }

  handleRating(nextValue) {
    this.props.createUserRating(this.props.match.params.userId, nextValue);
  }

  render() {
    if (this.props.user === undefined) {
      return null;
    } else {
      const user = this.props.user;

      let showRatingAvg = () => {
        const ratingNums = [];
        this.props.user.ratings.forEach((ratingId, i) => {
          {
            this.props.ratings.forEach((rating) => {
              if (rating._id === ratingId) {
                ratingNums.push(rating.rating);
              }
            });
          }
        });
        if (ratingNums.length <= 0) {
          let avg = 0;
          return (
            <ReactStars
              className="rating-stars"
              value={avg}
              onChange={this.handleRating}
              count={5}
              size={18}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
            />
          );
        } else {
          let sum = ratingNums.reduce(
            (acc, currVal, currIdx, arr) => acc + currVal
          );
          let avg = sum / ratingNums.length;
          return (
            <ReactStars
              className="rating-stars"
              value={avg}
              onChange={this.handleRating}
              count={5}
              size={19}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
            />
          );
        }
        // else {
        //     let avg = 0
        //     return (
        //         <ReactStars
        //             className="rating-stars"
        //             value={avg}
        //             onChange={this.handleRating}
        //             count={5}
        //             size={19}
        //             isHalf={true}
        //             emptyIcon={<i className="far fa-star"></i>}
        //             halfIcon={<i className="fa fa-star-half-alt"></i>}
        //             fullIcon={<i className="fa fa-star"></i>}
        //             activeColor="#ffd700"
        //         />
        //     )
        // }
      };

      // const userCommentInput = (this.props.currentUser === undefined) ? <div><Link className="login-link" to="/login">Log in</Link> to leave a review</div> :
      //   <form onSubmit={this.handleSubmit}>
      //     <textarea type="textarea"
      //       className="review-input"
      //       cols="50" rows="5"
      //       value={this.state.comment}
      //       onChange={this.update()}
      //       placeholder="What did you think of this location?"
      //     />
      //     <br />
      //     <input className="submit" type="submit" value="Submit" />
      //   </form>

      return (
        <div>
          <div className="user-show-header">
            <GiHamburgerMenu
              size={25}
              onClick={() => {
                this.props.openNavModal();
              }}
              className="menu-icon-other"
            />
            <div className="user-search-show">
              <Searchbar />
            </div>
            <Link className="user-header-h1" to={"/"}>
              <h1 className="header-logo">Busque</h1>
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
              <div className="user-rating">{showRatingAvg()}</div>
              <div className="user-show-performer-type">
                Performer Type: {user.performerType}
              </div>
              <div className="user-show-bio">Bio: {user.bio}</div>
            </div>
          </div>
          <div className="user-reviews">
            <h2>Reviews</h2>
            {/* {userCommentInput} */}
          </div>
        </div>
      );
    }
  }
}

export default withRouter(UserShow);
