import React from "react";
import VenueIndexItem from "./venue_index_item";
import { GiHamburgerMenu } from "react-icons/gi";

class VenueIndex extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchVenues();
  }

  render() {
    return (
      <div>
        <div className="venue-header-container">
          <div className="user-header">
            <GiHamburgerMenu
              size={25}
              onClick={() => {
                this.props.openNavModal();
              }}
              className="engineer-menu-icon-other"
            />
          </div>
          <div className="venue-header-center">
            <h1 className="venue-header-h1">Our Top Venues</h1>
          </div>
        </div>
        {this.props.venues.map((venue, i) => {
          return (
            <VenueIndexItem
              venue={venue}
              users={this.props.users}
              comments={this.props.comments}
              isAuthenticated={this.props.isAuthenticated}
              currentUser={this.props.currentUser}
              createComment={this.props.createComment}
              fetchVenueComments={this.props.fetchVenueComments}
              createVenueRating={this.props.createVenueRating}
              fetchVenueRatings={this.props.fetchVenueRatings}
              ratings={this.props.ratings}
              likes={this.props.likes}
              fetchVenueLikes={this.props.fetchVenueLikes}
              createVenueLike={this.props.createVenueLike}
              removeVenueLike={this.props.removeVenueLike}
              key={i}
            />
          );
        })}
      </div>
    );
  }
}

export default VenueIndex;
