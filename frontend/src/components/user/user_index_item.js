import React from 'react'; 
import { Link } from 'react-router-dom'; 
import "../../css/user_index.css";
import ReactStars from 'react-rating-stars-component'; 


class UserIndexItem extends React.Component {

    constructor(props) {
        super(props)
        this.handleRating = this.handleRating.bind(this)
    }

    componentDidMount() {
        this.props.fetchUserRatings(this.props.user._id)
    }

    handleRating(nextValue) {
        this.props.createUserRating(this.props.user._id, nextValue)

    }

    render() {
        if (!this.props.user) {
            return null; 
        }

        let showRatingAvg = () => {
            const ratingNums = []
            this.props.user.ratings.forEach((ratingId, i) => {
                {this.props.ratings.forEach((rating) => {
                    if (rating._id === ratingId) {
                        ratingNums.push(rating.rating)
                    }
                })}
            })
            if (ratingNums.length > 0) {
                let sum = ratingNums.reduce((acc, currVal, currIdx, arr) => acc + currVal)
                let avg = (sum / ratingNums.length || 0)  
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
                )
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
        }

        return (
            <div className="user-list-items-outer">
                    <div className="user-list-items">
                        <Link className="user-photo" to={`/profile/${this.props.user._id}`}>
                            <img src={this.props.user.imageURL} alt="profile" />
                        </Link>
                        <br/>
                        <div className="user-info">
                            <div className="username-outer">
                                <Link className="user-username" to={`/profile/${this.props.user._id}`}>
                                    {this.props.user.username}
                                </Link>
                            </div>
                            <div className="user-rating">
                                {showRatingAvg()} 
                            </div> 
                            <div className="performer-type">
                                Performer Type: {this.props.user.performerType}
                            </div>
                            <div className="bio">
                                Bio: {this.props.user.bio}
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default UserIndexItem;