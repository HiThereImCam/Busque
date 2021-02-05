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
    this.state = {
      comment: "", 
      commenter: "", 
      newComment: false 
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRating = this.handleRating.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
    this.props.fetchUserComments(this.props.match.params.userId);
    this.props.fetchUserRatings(this.props.match.params.userId);

    if (this.props.currentUser !== undefined) {
      this.setState({
        commenter: this.props.currentUser
      })
    }  
  }

  componentDidUpdate() {
    if (this.state.newComment === true) {
      this.setState({
        newComment: false,
      })
    }
  }

  update() {
    return e => this.setState({
      comment: e.currentTarget.value,
      commenter: this.props.currentUser,
    })
  }

  handleRating(nextValue) {
    this.props.createUserRating(this.props.match.params.userId, nextValue);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createUserComment(this.props.match.params.userId, this.state.comment, this.state.commenter._id)

    this.setState({
      comment: "",
      newComment: true
    })
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

      const userCommentInput = (this.props.currentUser === undefined) ? <div><Link className="login-link" to="/login">Log in</Link> to leave a review</div> :
        <form onSubmit={this.handleSubmit}>
          <textarea type="textarea"
            className="review-input-user"
            cols="45" rows="5"
            value={this.state.comment}
            onChange={this.update()}
            placeholder="What did you think of their performance?"
          />
          <br />
          <input className="submit-user" type="submit" value="Submit" />
        </form>

      const noReviews = (this.props.user.comments.length === 0) ? <div>Be the first to review!</div> : null

      return (
        <div className="user-show-page">
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
            {userCommentInput}
            <br />
            {noReviews}
          </div>
          
          {this.props.user.comments.slice().reverse().map((commentId, i) => {
              return (
                <div key={i}>
                  {this.props.comments.map((comment, j) => {
                    if (comment._id === commentId) {
                      return (
                        //TODO change comment.user to comment.commenter
                        <div className="review-each-user" key={j}>
                          <div className="reviewer-name"> 
                            {comment.commenter === undefined ? "Username says:" :
                              (comment.commenter === this.props.currentUser && comment.commenter.username === undefined) ? "From You:" :
                                "From " + comment.commenter.username + ":"}
                          </div>
                          {comment.comment}
                          <div className="review-date">
                            {comment.date}
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              )
          })}
        </div>
      );
    }
  }
}

export default withRouter(UserShow);
