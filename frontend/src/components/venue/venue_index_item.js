import React from 'react'; 
import { Link } from 'react-router-dom'; 
import "../../css/venue_index.css"

class VenueIndexItem extends React.Component {
    render() {
        let isAvailable = () => {
            if (this.props.venue.available === true) {
                return "Yes"
            } else {
                return "No"
            }
        }

        let showCurrentUser = () => {
            if (this.props.venue.available !== true) {
                return this.props.venue.currentUser + " is here"
            } 
        }

        return (
            <div className="venue-list-items">
                <div>
                    {this.props.venue.name}
                </div>
                {/* <div>
                    {this.props.venue.coordinate}
                </div> */}
                <div>
                    Type: {this.props.venue.type}
                </div>
                <div>
                    Rating: {this.props.venue.ratings}
                </div>
                <div>
                    Available? {isAvailable()}
                </div>
                <div>
                    {showCurrentUser()}
                </div>
                <div>
                    Reviews: {this.props.venue.comments}
                </div>
                {/* <br /> */}
            </div>
        )
    }
}

export default VenueIndexItem;