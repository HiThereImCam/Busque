import React from 'react'; 
import { Link, withRouter } from 'react-router-dom'; 
import "../../css/venue_index.css";
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

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
    }

    componentDidMount() {
        this.props.fetchVenueComments(this.props.venue._id)

        if (this.props.currentUser !== undefined) {
            this.setState({
                ["user"]: this.props.currentUser
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.newComment === true) {
            this.state.newComment = false
            this.state.showReviews = true
        }
    }


    update() {
        return e => this.setState({
            comment: e.currentTarget.value
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
            if ((this.props.venue.available !== true) && (this.props.venue.currentUser !== undefined)) {
                const currentUserId = this.props.venue.currentUser[0]
                return this.props.users[currentUserId].username + " is here"
            } else { 
                return null
            }
        }

        const userCommentInput = (this.props.currentUser === undefined) ? <div><Link className="login-link" to="/login">Log in</Link> to leave a review</div> :
            <form onSubmit={this.handleSubmit}>
                <textarea type="textarea"
                    className="review-input"
                    cols="50" rows="5"
                    value={this.state.comment}
                    onChange={this.update()}
                    placeholder="What did you think of this location?"
                />
                <br />
                <input className="submit" type="submit" value="Submit" />
            </form>

        return (
            <div className="venue-list-items">
                <div className="venue-name">
                    {this.props.venue.name}
                </div>
                <div className="venue-list-info">
                    <div className="venue-type">
                        Type: {this.props.venue.type}
                    </div>
                    <div className="venue-rating">
                        Rating: {this.props.venue.ratings}
                    </div>
                    <div className="venue-availabilty">
                        Available? {isAvailable()}
                    </div>
                    <div className="venue-current-user">
                        {showCurrentUser()}
                    </div>
                    {userCommentInput}
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
                                                                Username says:
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