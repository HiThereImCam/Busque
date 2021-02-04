import React from 'react'; 
import VenueIndexItem from './venue_index_item'; 
import { GiHamburgerMenu } from "react-icons/gi";


class VenueIndex extends React.Component {
    componentDidMount() {
        this.props.fetchUsers(); 
        this.props.fetchVenues(); 
    }

    render() {
        return (
            <div>
                <div className="user-header">
                    <GiHamburgerMenu
                        size={25}
                        onClick={() => {
                            this.props.openNavModal();
                        }}
                        className="menu-icon-other"
                    />
                    <h1>Our Top Venues</h1>
                </div>
                {this.props.venues.map((venue, i) => {
                    return <VenueIndexItem venue={venue} 
                        users={this.props.users}  
                        comments={this.props.comments}
                        isAuthenticated={this.props.isAuthenticated}
                        currentUser={this.props.currentUser}
                        createComment={this.props.createComment} 
                        fetchVenueComments={this.props.fetchVenueComments}
                        createVenueRating={this.props.createVenueRating}
                        fetchVenueRatings={this.props.fetchVenueRatings}
                        ratings={this.props.ratings}
                        key={i} />
                })}
            </div>
        )
    }
}

export default VenueIndex; 