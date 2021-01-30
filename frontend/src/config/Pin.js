import React, { Component } from "react";
import mapboxgl from "mapbox-gl";

class Pin extends Component {
  constructor(props) {
    super(props);
    let { venue, map, curLoggedInUser, checkIn, isAuthenticated } = this.props;
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
    let {
      venue,
      map,
      curLoggedInUser,
      checkIn,
      isAuthenticated,
      users,
    } = this.props;

    let htmlContent;
    if (available) {
      if (isAuthenticated) {
        htmlContent = `
                    <h1>${venue.name}</h1>
                    <button id = "${venue._id}"
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
      this.marker._color = "red";
      let usersArr = Object.keys(users);
      let userID = usersArr.find((userEl) => userEl === venue.currentUser);
      let user = users[userID];
      htmlContent = `
        <div class="popUp_Container">
                <h1>${venue.name}</h1>
                <p class="popUp_Username">${user.username}</p>
                <img id="profile_pic" src=${user.imageURL}height=50 width=50></img>
            
        </div>
      `;
    }

    this.state.marker
      .setLngLat(venue.coordinate)
      .setPopup(
        this.state.popup.setLngLat(venue.coordinate).setHTML(htmlContent)
      )
      .addTo(map);
  }

  componentDidUpdate(prevProps) {
    let { available } = this.state;
    let {
      venue,
      map,
      curLoggedInUser,
      checkIn,
      isAuthenticated,
      users,
    } = this.props;

    console.log("I MADE IT TO THE COMPONENT DID UPDATE");

    let htmlContent;
    if (venue.available) {
      if (isAuthenticated) {
        htmlContent = `
                    <h1>${venue.name}</h1>
                    <button id = "${venue._id}"
                            onclick="handleCheckIn(this.id)"
                            ref=${this.buttonRef.current}>Check in</button>
                  `;
      } else {
        htmlContent = `
                        <h1>${venue.name}</h1>
                        <p>Please log in </>
                    `;
      }

      this.state.marker
        .setLngLat(venue.coordinate)
        .setPopup(
          new mapboxgl.Popup().setLngLat(venue.coordinate).setHTML(htmlContent)
        )
        .addTo(map);
    } else {
      this.marker.remove();
      this.marker = new mapboxgl.Marker({
        color: "red",
      });

      console.log("these are the users: ", users);
      let usersArr = Object.keys(users);
      let userID = usersArr.find((userEl) => userEl === venue.currentUser);
      let user = users[userID];
      htmlContent = `
        <div class="popUp_Container">
                <h1>${venue.name}</h1>
                <p class="popUp_Username">${user.username}</p>
                <img id="profile_pic" src=${user.imageURL} height=75 width=75></img>
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

    // this.state.marker
    //   .setLngLat(venue.coordinate)
    //   .setPopup(
    //     new mapboxgl.Popup().setLngLat(venue.coordinate).setHTML(htmlContent)
    //   )
    //   .addTo(map);
  }

  handleCheckIn(venueID) {
    let { curLoggedInUser, checkIn } = this.props;

    checkIn(venueID, curLoggedInUser);
  }

  render() {
    return <></>;
  }
}

export default Pin;
