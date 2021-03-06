import React from 'react'; 
import { Link, withRouter } from 'react-router-dom'; 
import "../../css/venue_index.css";
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import ReactStars from 'react-rating-stars-component'; 
import moment from 'moment';
import { GoTrashcan } from "react-icons/go";

class VenueIndexItem extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            comment: "", 
            user: "",
            showReviews: false,
            arrowUp: false,
            arrowDown: true,
            newComment: false, 
            redHeart: false
        }

        this.handleSubmit = this.handleSubmit.bind(this); 
        this.update = this.update.bind(this); 
        this.handleRating = this.handleRating.bind(this); 
        this.handleLike = this.handleLike.bind(this);
        this.handleUnlike = this.handleUnlike.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        if (this.props.currentUser !== undefined) {
            this.setState({
                user: this.props.currentUser
            })
        }        
    }

    componentDidUpdate() {
        if (this.state.newComment === true) {
            this.setState({
                user: this.props.currentUser,
                newComment: false,
                showReviews: true, 
            })
        }
    }


    update() {
        return e => this.setState({
            comment: e.currentTarget.value, 
            user: this.props.currentUser,
        })
    }

    handleReviewShow(e) {
        e.preventDefault(); 
        this.setState({
            showReviews: !this.state.showReviews, 
            arrowUp: !this.state.arrowUp,
            arrowDown: !this.state.arrowDown 
        })
    }

    handleRating(nextValue) { 
        this.props.createRating({"venue": this.props.venue._id, "rating": nextValue})
    }

    handleLike(e) {
        e.preventDefault(); 
        this.props.createLike({"venueId": this.props.venue._id, "likerId": this.state.user})
        this.setState({
            redHeart: true
        })
    }
    handleUnlike(e) {
        e.preventDefault(); 

        const likes = Object.values(this.props.likes) //whole like objects
        for (let i = 0; i < likes.length; i++) {
            if ((likes[i].venueId === this.props.venue._id) && (likes[i].likerId === this.props.currentUser)) {
                this.props.deleteLike(likes[i]._id)
            }
        }

        this.setState({
            redHeart: false
        })
    }


  handleSubmit(e) {
    e.preventDefault();
    this.props.createComment({
      venueId: this.props.venue._id,
      comment: this.state.comment,
      commenter: this.state.user,
    });

    this.setState({
        comment: "",
        newComment: true
    })
   }

    handleDelete(id) {
        this.props.deleteComment(id); 
    }

    render() {
        let isAvailable = () => {
            if (this.props.venue.available === true) {
                return " Yes"
            } else {
                return " No"
            }
        }
        let usersArr = Object.values(this.props.users)
        let showCurrentUser = () => {
            if ((this.props.venue.available === false) && (this.props.venue.currentUser !== undefined)) {
                const currentUserId = this.props.venue.currentUser
                return (
                    usersArr.map((user, i) => {
                        if (user._id === currentUserId) {
                            return (
                                <div className="venue-current-user-inner" key={i}>
                                    <img src={user.imageURL} alt="profile" className="venue-index-currentUser" />&nbsp;&nbsp;
                                    <Link to={`/profile/${currentUserId}`} className="currentUser-link">{user.username}</Link>&nbsp;is here
                                </div>
                            )
                        }
                    })
                )
            } else { 
                return null
            }
        }

        const userCommentInput = (this.props.currentUser === undefined) ? <div><Link className="login-link" to="/login">Log in</Link> to leave a review</div> :
            <form onSubmit={this.handleSubmit}>
                <textarea type="textarea"
                    className="review-input"
                    cols="45" rows="5"
                    value={this.state.comment}
                    onChange={this.update()}
                    placeholder="What did you think of this location?"
                />
                <br />
                <input className="submit" type="submit" value="Submit" />
            </form>

        let showRatingAvg = () => {
            const ratingNums = []
            this.props.ratings.forEach((rating) => {
                if (rating.venue === this.props.venue._id) {
                    ratingNums.push(rating.rating)
                }
            })
            if (ratingNums.length > 0) {
                let sum = ratingNums.reduce((acc, currVal, currIdx, arr) => acc + currVal)
                let avg = sum / ratingNums.length
                return (
                    <div className="venue-rating-inner">
                        <ReactStars
                            className = "rating-stars"
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
                )
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
                )
            }
        }


        const noReviews = () => {
            let venueComments = []
            for (let j = 0; j < this.props.comments.length; j++) {
                if (this.props.comments[j].venue === this.props.venue._id) {
                    venueComments.push(this.props.comments[j])
                }
            }
            if (venueComments.length === 0) {
                return (
                    <div className="no-reviews">Be the first to review!</div>
                )
            } else {
                return null
            }
        }

        const likes = Object.values(this.props.likes) //whole like objects
        let peopleLiked = [];
        for (let i = 0; i < likes.length; i++) {
            if (likes[i].venueId === this.props.venue._id) {
                peopleLiked.push(likes[i].likerId)
            }
        }

        const likeButton = () => {
      if (this.props.currentUser === undefined) {
        return null;
      }

      if (peopleLiked.includes(this.props.currentUser)) {
        return (
          <div className="likes">
            <button className="like-button" onClick={this.handleUnlike}>
              <i className="fas fa-heart fa-lg" style={{ color: "red" }}></i>
            </button>
            {peopleLiked.length}
          </div>
        );
      } else {
        return (
          <div className="likes">
            <button className="like-button" onClick={this.handleLike}>
              <i className="fas fa-heart fa-lg" style={{ color: "gray" }}></i>
            </button>
            {peopleLiked.length}
          </div>
        );
      }
    };

    return (
      <div className="venue-list-items">
        <div className="venue-name">{this.props.venue.name}</div>
        <div className="venue-list-info">
          <div className="venue-info-outer venue-info-outer-alt">
            <div className="venue-info venue-info-alt">
              <div className="venue-rating">{showRatingAvg()}</div>
              {likeButton()}
              <div className="venue-type">Type: {this.props.venue.type}</div>
              <div className="venue-availabilty">
                Available? {isAvailable()}
              </div>
              <div className="venue-current-user">{showCurrentUser()}</div>
              {userCommentInput}
            </div>
            <div className="venue-pic venue-pic-alt">
              <img src={this.props.venue.imageURL} alt="venue" />
            </div>
          </div>
          <div className="venue-reviews">
            <div
              className="reviews-dropdown"
              onClick={this.handleReviewShow.bind(this)}
            >
              Reviews{" "}
              {this.state.arrowDown && (
                <TiArrowSortedDown size={20} className="review-arrow-down" />
              )}
              {this.state.arrowUp && (
                <TiArrowSortedUp size={20} className="review-arrow-up" />
              )}
            </div>
            <div className="venue-reviews-inner">
              {this.state.showReviews &&
                this.props.comments
                  .slice()
                  .reverse()
                  .map((comment, i) => {
                    if (comment.venue === this.props.venue._id) {
                      return (
                        <div className="review-each" key={i}>
                          <div className="commenter-img">
                            {comment.user === undefined &&
                            comment.commenter ===
                              undefined ? null : comment.user === undefined ? (
                              <img
                                src={
                                  this.props.users[comment.commenter].imageURL
                                }
                                alt="profile"
                                className="comment-profile"
                              />
                            ) : comment.commenter === undefined ? (
                              <img
                                src={this.props.users[comment.user].imageURL}
                                alt="profile"
                                className="comment-profile"
                              />
                            ) : null}
                          </div>
                          <div className="comment-info">
                            <div className="reviewer-name">
                              {comment.user === undefined && comment.commenter === undefined
                                ? "Username says:"
                                : comment.commenter === undefined
                                ? "From " + this.props.users[comment.user].username + ":"
                                : "From " + this.props.users[comment.commenter].username}
                            </div>
                            <div className="comment">{comment.comment}</div>
                            <div className="review-date">
                              {moment(comment.date).format("LL")}
                            </div>
                          </div>
                          <div className="comment-delete">
                            {comment.user === undefined && comment.commenter === undefined 
                              ? null : comment.commenter === undefined &&
                              comment.user === this.props.currentUser ? (
                              <button
                                className="comment-delete-button"
                                onClick={() => this.handleDelete(comment._id)}
                              >
                                <GoTrashcan size={21} />
                              </button>
                            ) : comment.commenter === this.props.currentUser &&
                              comment.user === undefined ? (
                              <button
                                className="comment-delete-button"
                                onClick={() => this.handleDelete(comment._id)}
                              >
                                <GoTrashcan size={21} />
                              </button>
                            ) : null}
                          </div>
                        </div>
                      );
                    }
                  })}
              {this.state.showReviews && noReviews()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(VenueIndexItem);