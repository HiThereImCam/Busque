import React from 'react'; 
import { Link, withRouter } from 'react-router-dom'; 
import "../../css/venue_index.css";
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import ReactStars from 'react-rating-stars-component'; 

class VenueIndexItem extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            comment: "", 
            user: "",
            showReviews: false,
            arrowUp: false,
            arrowDown: true,
            newComment: false
        }

        this.handleSubmit = this.handleSubmit.bind(this); 
        this.update = this.update.bind(this); 
        this.handleRating = this.handleRating.bind(this); 
        this.handleLike = this.handleLike.bind(this);
    }

    componentDidMount() {
        this.props.fetchVenueComments(this.props.venue._id)
        this.props.fetchVenueRatings(this.props.venue._id)
        this.props.fetchVenueLikes(this.props.venue._id)

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

    handleRating(nextValue, prevValue) { 
        this.props.createVenueRating(this.props.venue._id, nextValue)
    }

    handleLike(e) {
        e.preventDefault(); 
        this.props.createVenueLike(this.props.venue._id, this.state.user)
    }

    handleSubmit(e) {
        e.preventDefault(); 
        this.props.createComment(this.props.venue._id, this.state.comment, this.state.user)

        this.setState({
            comment: "",
            newComment: true
        })
    }

    render() {
        let isAvailable = () => {
            if (this.props.venue.available === true) {
                return " Yes"
            } else {
                return " No"
            }
        }

        let showCurrentUser = () => {
            if ((this.props.venue.available === false) && (this.props.venue.currentUser !== undefined)) {
                const currentUserId = this.props.venue.currentUser
                return (
                    this.props.users.map((user) => {
                        if (user._id === currentUserId) {
                            return (
                                <div className="venue-current-user-inner">
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
            this.props.venue.ratings.forEach((ratingId, i) => {
                this.props.ratings.forEach((rating) => {
                    if (rating._id === ratingId) {
                        ratingNums.push(rating.rating)
                    }
                })
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
            // else {
            //     return (
            //         <ReactStars
            //             className="rating-stars"
            //             value={0}
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
        }

        return (
            <div className="venue-list-items">
                <div className="venue-name">
                    {this.props.venue.name}
                </div>
                <div className="venue-list-info">
                    <div className="venue-info-outer venue-info-outer-alt">
                        <div className="venue-info venue-info-alt">
                            <div className="venue-rating">
                                {showRatingAvg()}
                            </div>
                            <div>
                                <button onClick={this.handleLike}>Like</button>
                                {this.props.venue.likes}
                            </div>
                            <div className="venue-type">
                                Type: {this.props.venue.type}
                            </div>
                            <div className="venue-availabilty">
                                Available? {isAvailable()}
                            </div>
                            <div className="venue-current-user">
                                {showCurrentUser()}
                            </div>
                            {userCommentInput}
                        </div>
                        <div className="venue-pic venue-pic-alt">
                            <img src={this.props.venue.imageURL} alt="venue" />
                        </div>
                    </div>
                    <div className="venue-reviews">
                        <div className="reviews-dropdown" onClick={this.handleReviewShow.bind(this)} >
                            Reviews {this.state.arrowDown && <TiArrowSortedDown size={20} className="review-arrow-down" />}{this.state.arrowUp && <TiArrowSortedUp size={20} className="review-arrow-up" />} 
                        </div>
                        <div className="venue-reviews-inner">
                            {this.state.showReviews &&
                                this.props.venue.comments.slice().reverse().map((commentId, i) => {
                                    return (
                                        <div key={i}>
                                            {this.props.comments.map((comment, j) => {
                                                if (comment._id === commentId) {
                                                    return (
                                                        <div className="review-each" key={j}>
                                                            <div className="reviewer-name">
                                                                {comment.user === undefined ? "Username says:" : 
                                                                    (comment.user === this.props.currentUser && comment.user.username === undefined) ? "From You:" :
                                                                    "From " + comment.user.username + ":" }
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
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(VenueIndexItem);