import React from 'react'; 
// import { Link } from 'react-router-dom'; 
import "../../css/venue_index.css";
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
// import { getVenueComments } from '../../util/venue_api_util'; 
// import { fetchVenueComments } from '../../actions/venue_actions';

class VenueIndexItem extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            comment: "", 
            showReviews: false,
            arrowUp: false,
            arrowDown: true
        }

        this.handleSubmit = this.handleSubmit.bind(this); 
        this.update = this.update.bind(this); 
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (this.props.venue.comments !== prevProps.venue.comments) {
    //         console.log(this.props.venue.comments); 
    //         console.log(prevProps.venue.comments)
    //         this.props.fetchVenueComments(this.props.venue._id); 
    //     }
    // }

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
        console.log("clicked")
    }

    handleSubmit(e) {
        e.preventDefault(); 
        // console.log("commented")
        this.props.createComment(this.props.venue._id, this.state.comment)
        // this.props.fetchVenueComments(this.props.venue._id)
        console.log(this.state.comment)

        this.setState({
            comment: ""
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
            } else { //! Edit later?
                return null
            }
        }

        let showComments = () => {
            this.props.venue.comments.map((commentId, i) => {
                let venueComments = this.props.fetchVenueComments(this.props.venue._id)
                console.log(this.props.venue._id)
                console.log(venueComments)
                return commentId
            })
        }

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
                    <div className="venue-reviews">
                        <div className="reviews-dropdown" onClick={this.handleReviewShow.bind(this)} >
                            Reviews {this.state.arrowDown && <TiArrowSortedDown size={20} className="review-arrow-down" />}{this.state.arrowUp && <TiArrowSortedUp size={20} className="review-arrow-up" />} 
                        </div>
                        <div className="venue-reviews-inner">
                            {/* {this.state.showReviews &&
                            this.props.venue.comments.map((comment, i) => {
                                this.props.fetchVenueComments(this.props.venue._id)
                                return <div className="review-each" key={i}>
                                    <div className="reviewer-name">Username says:</div> 
                                    {comment}
                                </div>
                            })}  */}
                            {this.state.showReviews && 
                                <div className="review-each">
                                    {showComments()}
                                </div>
                            } 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default VenueIndexItem;