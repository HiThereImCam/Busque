import React, { Component } from "react";
import mapboxgl from "mapbox-gl";

class Pin extends Component {
  constructor(props) {
    super(props);
    let { venue, map, curLoggedInUser, checkIn, isAuthenticated } = this.props;
    this.marker = new mapboxgl.Marker({
      color: "#4CBB17",
    })
      .setLngLat(venue.coordinate)
      .addTo(map);
    this.state = {
      isAvailable: venue.isAvailable,
      id: venue._id,
    };
    this.buttonRef = React.createRef();
    this.handleCheckIn = this.handleCheckIn.bind(this);
    window.handleCheckIn = this.handleCheckIn;
  }

  componentDidMount() {
    let { isAvailable } = this.state;
    let {
      venue,
      map,
      curLoggedInUser,
      checkIn,
      isAuthenticated,
      users,
    } = this.props;

    let user = users.find((user) => user.id === venue.currentUser);

    let htmlContent;
    if (isAvailable) {
      if (isAuthenticated) {
        htmlContent = `
                    <h1>${venue.name}</h1>
                    <button id = "${venue.name}"
                            onclick="handleCheckIn(this.id)"
                            ref=${this.buttonRef.current}>Check in</button>
                  `;
      } else {
        htmlContent = `
                        <h1>${venue.name}</h1>
                        <p>Please log in </>
                    `;
      }
    } else {
      //   this.marker.color = "red";
      htmlContent = `
        <div class="popUp_Container">
                <h1>${venue.name}</h1>
                <p class="popUp_Username">${user.username}</p>
                <img id="profile_pic" src=${user.imageURL} height=50 width=50></img>
            
        </div>
      `;
    }
    this.marker
      .setPopUp(
        new mapboxgl.Popup().setLngLat(venue.coordinate).setHTML(htmlContent)
      )
      .addTo(map);
  }

  componentDidUpdate(prevProps) {}

  handleCheckIn(venueName) {
    let { curLoggedInUser, checkIn } = this.props;
    let { id } = this.state;

    checkIn(id, curLoggedInUser);
    this.marker.togglePopup();
  }

  render() {
    return <></>;
  }
}

export default Pin;
