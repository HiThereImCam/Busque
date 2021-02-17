import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
// import formatTime from "../../../config/formatTime";

class Pin extends Component {
  constructor(props) {
    super(props);
    let { venue } = this.props;
    this.marker = new mapboxgl.Marker({
      color: "#4CBB17",
    });
    this.state = {
      available: venue.available,
      marker: this.marker,
      popup: new mapboxgl.Popup(),
    };
    this.buttonRef = React.createRef();
    this.handleCheckIn = this.handleCheckIn.bind(this);
    window.handleCheckIn = this.handleCheckIn;
  }

  componentDidMount() {
    let { available } = this.state;
    let { venue, map, isAuthenticated, users } = this.props;

    let htmlContent;
    if (available) {
      if (isAuthenticated) {
        htmlContent = `
                    <div style="padding: 5px 3px 3px 3px;">
                      <h1>${venue.name}</h1>
                      <button id = "${venue._id}"
                              onclick="handleCheckIn(this.id)"
                              ref=${this.buttonRef.current}>Check in</button>
                    </div> 
                  `;
      } else {
        htmlContent = `
                        <div style="padding: 5px 3px 3px 3px;">
                          <h1>${venue.name}</h1>
                          <button onclick="redirectLogin()">Sign In</button>
                        </div>
                    `;
      }

      this.marker
        .setLngLat(venue.coordinate)
        .setPopup(
          this.state.popup.setLngLat(venue.coordinate).setHTML(htmlContent)
        )
        .addTo(map);
    } else {
      this.marker.togglePopup();
      this.marker.remove();
      this.marker = new mapboxgl.Marker({
        color: "red",
      });
      let usersArr = Object.keys(users);
      let userID = usersArr.find((userEl) => userEl === venue.currentUser);
      let user = users[userID];

      htmlContent = `
        <div style="padding: 5px 3px 3px 3px; display: flex; justify-content: center;">
                <h1>${venue.name}</h1>
                <div style="display: flex; align-items: center; padding-top: 2px">
                  <img id="profile_pic" src=${user.imageURL} height=30 width=30 style="border-radius: 50%"></img>
                  <p style="padding-left: 3px; font-size: 14px;">${user.username}</p>
              </div>
        </div>
      `;

      this.marker
        .setLngLat(venue.coordinate)
        .setPopup(
          this.state.popup.setLngLat(venue.coordinate).setHTML(htmlContent)
        )
        .addTo(map);
    }
  }

  componentDidUpdate(prevProps) {
    let { venue, map, isAuthenticated, users, userCheckedIn } = this.props;

    let htmlContent;
    if (venue.available) {
      if (isAuthenticated) {
        if (userCheckedIn === false) {
          htmlContent = `
                    <div style="padding: 5px 3px 3px 3px;">
                      <h1>${venue.name}</h1>
                      <button id = "${venue._id}"
                              onclick="handleCheckIn(this.id)"
                              ref=${this.buttonRef.current}>Check in</button>
                    </div> 
                  `;
        } else {
          htmlContent = `
                    <div style="padding: 5px 3px 3px 3px;">
                      <h1>${venue.name}</h1>
                      <p>Venue Available</p>
                    </div> 
                  `;
        }
      } else {
        //style="padding: 5px 3px 3px 3px;
        htmlContent = `
                        <div style="padding: 5px 3px 3px 3px;">
                          <h1>${venue.name}</h1>
                          <button onclick="redirectLogin()">Sign In</button>
                        </div>
                    `;
      }

      this.state.marker
        .setLngLat(venue.coordinate)
        .setPopup(
          new mapboxgl.Popup().setLngLat(venue.coordinate).setHTML(htmlContent)
        )
        .addTo(map);
    } else {
      this.marker.togglePopup();
      this.marker.remove();
      this.marker = new mapboxgl.Marker({
        color: "red",
      });

      let usersArr = Object.keys(users);
      let userID = usersArr.find((userEl) => userEl === venue.currentUser);
      let user = users[userID];
      htmlContent = `
        <div style="padding: 5px 3px 3px 3px;">
                <h1>${venue.name}</h1>
                <div style="display: flex; align-items: center;">
                  <img id="profile_pic" src=${user.imageURL} height=30 width=30 style="border-radius: 50%;"></img>
                  <p style="padding-left: 3px; font-size: 14px;">${user.username}</p>
                </div>
        </div>
      `;

      this.marker
        .setLngLat(venue.coordinate)
        .setPopup(
          this.state.popup.setLngLat(venue.coordinate).setHTML(htmlContent)
        )
        .addTo(map);

      this.marker.togglePopup();
    }
  }

  handleCheckIn(venueID) {
    let { curLoggedInUser, checkIn, checkUserIn } = this.props;

    checkIn(venueID, curLoggedInUser);
    checkUserIn();
  }

  render() {
    return <></>;
  }
}

export default Pin;
