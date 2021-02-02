import React from 'react'; 
import { Link } from 'react-router-dom'; 
import "../../css/user_index.css";
// import { AiOutlineStar } from 'react-icons/ai';

class UserIndexItem extends React.Component {

    componentDidMount() {
        this.props.fetchUserRatings(this.props.user._id)
    }

    render() {
        if (!this.props.user) {
            return null; 
        }

        let showRatingAvg = () => {
            const ratingNums = []
            this.props.user.ratings.map((ratingId, i) => {
                return (
                    <div key={i}>
                        {this.props.ratings.forEach((rating) => {
                            if (rating._id === ratingId) {
                                ratingNums.push(rating.rating)
                            }
                        })}
                    </div>
                )
            })
            if (ratingNums.length > 0) {
                let sum = ratingNums.reduce((acc, currVal, currIdx, arr) => acc + currVal)
                let avg = sum / ratingNums.length 
                return avg + "/5"
            } else {
                return "N/A"
            }
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
                            <div className="performer-type">
                                Performer Type: {this.props.user.performerType}
                            </div>
                            <div className="user-rating">
                                Rating: {showRatingAvg()} 
                            </div> {/* <AiOutlineStar size={20} className="review-star"/> */}
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