import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Searchbar from "../searchbar/searchbar_container";
import ReactStars from "react-rating-stars-component";
import "../../css/user_show.css";
import moment from 'moment';
import { GoTrashcan } from "react-icons/go";


class UserShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "", 
      commenter: "", 
      newComment: false, 
      redHeart: false 
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRating = this.handleRating.bind(this);
    this.update = this.update.bind(this); 
    this.handleLike = this.handleLike.bind(this);
    this.handleUnlike = this.handleUnlike.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers()
      .then(() => this.props.fetchUser(this.props.match.params.userId)) 
      .then(() => this.props.fetchAllComments())
      .then(() => this.props.fetchAllRatings())
      .then(() => this.props.fetchUserLikes(this.props.match.params.userId))

    if (this.props.currentUser !== undefined) {
      this.setState({
        commenter: this.props.currentUser,
      });
    }
  }

  componentDidUpdate() {
    if (this.state.newComment === true) {
      this.setState({
        newComment: false,
      });
    }
  }

  update() {
    return (e) =>
      this.setState({
        comment: e.currentTarget.value,
        commenter: this.props.currentUser,
      });
  }

  handleRating(nextValue) {
    this.props.createRating({ "user": this.props.match.params.userId, "rating": nextValue});
  }

  handleLike(e) {
    e.preventDefault();
    this.props.createLike({"userId": this.props.match.params.userId, "likerId": this.props.currentUser.id})
    this.setState({
      redHeart: true
    })
  }

  handleUnlike(e) {
    e.preventDefault(); 

    const likes = Object.values(this.props.likes) //whole like objects
    for (let i = 0; i < likes.length; i++) {
      if ((likes[i].userId === this.props.match.params.userId) && (likes[i].likerId === this.props.currentUser.id)) {
        this.props.deleteLike(likes[i]._id)
      }
    }

    this.setState({
      redHeart: false
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createComment({"user": this.props.match.params.userId, "comment": this.state.comment, "commenter": this.state.commenter.id})

    this.setState({
      comment: "",
      newComment: true,
    });
  }

  handleDelete(id) {
    this.props.deleteComment(id);
  }

  render() {
    if (this.props.user === undefined || this.props.ratings === undefined) {
      return null;
    } else {
      const user = this.props.user;

      let showRatingAvg = () => {
        const ratingNums = [];
        this.props.ratings.forEach((rating) => {
          if (rating.user === this.props.user._id) {
            ratingNums.push(rating.rating)
          }
        })

        if (ratingNums.length > 0) {
          let sum = ratingNums.reduce(
            (acc, currVal, currIdx, arr) => acc + currVal
          );
          let avg = sum / ratingNums.length;
          return (
            <div className="venue-rating-inner">
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
            </div>
          );
        }
        if (ratingNums.length === 0) {
          return (
            <ReactStars
              className="rating-stars"
              value={0}
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
        }
      };

      const userCommentInput =
        this.props.currentUser === undefined ? (
          <div>
            <Link className="login-link" to="/login">
              Log in
            </Link>{" "}
            to leave a review
          </div>
        ) : (
          <form onSubmit={this.handleSubmit}>
            <textarea
              type="textarea"
              className="review-input-user"
              cols="45"
              rows="5"
              value={this.state.comment}
              onChange={this.update()}
              placeholder="What did you think of their performance?"
            />
            <br />
            <input className="submit-user" type="submit" value="Submit" />
          </form>
        );

      const noReviews = () => {
        let userComments = []
        for (let j = 0; j < this.props.comments.length; j++) {
          if (this.props.comments[j].user === this.props.match.params.userId && this.props.comments[j].venue === undefined) {
            userComments.push(this.props.comments[j])
          }
        }
        if (userComments.length === 0) {
          return (
            <div>Be the first to review!</div>
          )
        } else {
          return null
        } 
      }

      
      const likes = Object.values(this.props.likes) //whole like objects
      let peopleLiked = [];
      for (let i = 0; i < likes.length; i++) {
        if (likes[i].userId === this.props.user._id) {
          peopleLiked.push(likes[i].likerId)
        }
      }

      const likeButton = () => {
        if (this.props.currentUser === undefined) {
          return null
        }

        if (peopleLiked.includes(this.props.currentUser.id)) {
          return (
            <div className="likes">
              <button className="like-button" onClick={this.handleUnlike}><i className="fas fa-heart fa-lg" style={{ color: "red" }}></i></button>
              {peopleLiked.length}
            </div>
          )
        } else {
          return (
            <div className="likes">
              <button className="like-button" onClick={this.handleLike}><i className="fas fa-heart fa-lg" style={{ color: "gray" }}></i></button>
              {peopleLiked.length}
            </div>
          )
        }
      }  

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
              {likeButton()}
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
            {noReviews()}
          </div>
          <div>
            {this.props.comments.slice().reverse().map((comment, i) => {
              if (comment.user === this.props.match.params.userId && comment.venue === undefined) {
                return (
                  <div className="review-each-user" key={i}>
                    <div className="commenter-img">
                      {(comment.commenter === undefined) ? null : <img src={this.props.users[comment.commenter].imageURL} alt="profile" className="comment-profile"/>}
                    </div>
                    <div className="comment-info">
                      <div className="reviewer-name">
                        {comment.commenter === undefined ? "Username says:" : "From " + this.props.users[comment.commenter].username + ":"}
                      </div>
                      <div className="comment">
                        {comment.comment}
                      </div>
                      <div className="review-date">
                        {moment(comment.date).format('LL')}
                      </div>
                    </div>
                    <div className="comment-delete">
                      {(comment.commenter === undefined) ? null
                        : (comment.commenter === this.props.currentUser.id) ?
                          <button className="comment-delete-button" onClick={() => this.handleDelete(comment._id)}><GoTrashcan size={21} /></button> 
                        : null}
                    </div>
                  </div>
                )
              }
            })}
          </div>
        </div>
      );
    }
  }
}

export default withRouter(UserShow);
