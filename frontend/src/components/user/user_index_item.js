import React from "react";
import { Link } from "react-router-dom";
import "../../css/user_index.css";
import ReactStars from "react-rating-stars-component";

class UserIndexItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: "",
            redHeart: false, 
        }

        this.handleRating = this.handleRating.bind(this)
        this.handleLike = this.handleLike.bind(this);
        this.handleUnlike = this.handleUnlike.bind(this);
    }

    componentDidMount() {
        // this.props.fetchUserRatings(this.props.user._id);

        if (this.props.currentUser !== undefined) {
            this.setState({
                user: this.props.currentUser,
            });
        }
    }

    handleRating(nextValue) {
        // this.props.createUserRating(this.props.user._id, nextValue);
    }

    handleLike(e) {
        e.preventDefault();
        this.props.createLike({"userId": this.props.user._id, "likerId": this.state.user})

        this.setState({
            redHeart: true
        })
    }

    handleUnlike(e) {
        e.preventDefault(); 

        const likes = Object.values(this.props.likes) //whole like objects
        for (let i = 0; i < likes.length; i++) {
            if ((likes[i].userId === this.props.user._id) && (likes[i].likerId === this.props.currentUser)) {
                this.props.deleteLike(likes[i]._id)
            }
        }
        
        this.setState({
            redHeart: false
        })
    }

    render() {
        if (!this.props.user) {
            return null; 
        }

        let showRatingAvg = () => {
            const ratingNums = []
            this.props.user.ratings?.map((ratingId, i) => {
                return (
                    <div>
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
                let avg = (sum / ratingNums.length)  
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
                )
            } 
            // if (ratingNums.length === 0) {
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
            
            if (peopleLiked.includes(this.props.currentUser)) {
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
                        <div>
                            {likeButton()}
                        </div>
                        <div className="performer-type">
                            Performer Type: {this.props.user.performerType}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserIndexItem;
