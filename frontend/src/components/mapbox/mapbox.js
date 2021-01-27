import React, { Component, Fragment } from "react";
import { GiHamburgerMenu, GiTriquetra } from "react-icons/gi";
import mapboxgl from "mapbox-gl";
import "../../css/mapbox.css";

import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import defaultMarkers from "../../config/defaultMarkers";
import loggedInMarkers from "../../config/loggedInMarkers";
import markerLocations from "../../config/markerLocations";

const REACT_APP_MAPBOX_KEY = process.env.REACT_APP_MAPBOX_KEY;

mapboxgl.accessToken = REACT_APP_MAPBOX_KEY;

class MapBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -122.4363143,
      lat: 37.7461108,
      zoom: 12,
      isCheckedIn: false,
      ///venue: this.props.venues
      // markerColor: "#4CBB17",
    };

    this.mapBoxRef = React.createRef();
    this.buttonRef = React.createRef();
    this.handleCheckIn = this.handleCheckIn.bind(this);
    this.observer = this.observer.bind(this);
    window.handleCheckIn = this.handleCheckIn;
  }

  componentDidMount() {
    this.props.fetchVenues();
    this.props.fetchUsers();

    if (window.matchMedia("(max-width: 420px)")) {
      this.setState({
        lng: -122.428,
        lat: 37.5713,
      });
    }

    new mapboxgl.Popup();

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });

    const geocoder = new MapboxGeocoder({
      container: this.geocoder,
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });
    this.map.addControl(geocoder, "top-left");
    this.map.on("move", () => {
      this.setState({
        lng: this.map.getCenter().lng.toFixed(4),
        lat: this.map.getCenter().lat.toFixed(4),
        zoom: this.map.getZoom().toFixed(2),
      });
    });
  }

  // needs to be authenticated

  componentDidUpdate(prevProps) {
    let { venues, users, isAuthenticated, currentUser } = this.props;
    let { isCheckedIn, venueID } = this.state;
    if (isAuthenticated) {
      // gives the user the ability to check in
      loggedInMarkers(venues, this.map, this.buttonRef, users);
      if (isCheckedIn) {
        let venue = venues.find((venue) => venue._id === venueID);
        let user = users[currentUser];

        let marker = new mapboxgl.Marker({
          color: "red",
        })
          .setLngLat(venue.coordinate)
          .addTo(this.map);

        marker
          .setPopup(
            new mapboxgl.Popup().setLngLat(venue.coordinate).setHTML(
              `
                <div class="popUp_Container">
                  <h1>${venue.name}</h1>
                  <p class="popUp_Username">${user.username}</p>
                  <img id="profile_pic" src=${user.imageURL} height=75 width=75></img>
                </div>
              `
            )
          )
          .addTo(this.map);
      }
    } else {
      // otherwise display markers w/o that ability
      defaultMarkers(venues, this.map, users);
    }
  }

  handleCheckIn(venueName) {
    let { currentUser, checkIn, venues } = this.props;
    console.log("handle check in: ", venueName);
    let venue = venues.find((venue) => venue.name === venueName);
    // checkIn(venue._id, currentUser);
    this.setState({
      isCheckedIn: true,
      venueID: venue._id,
    });

    let venueId = venue._id;
    let marker = window.markers.find(
      (marker) => marker._element.id === venueId
    );
    console.log("marker: ", marker);
    marker.togglePopup();
  }
  render() {
    let { openNavModal } = this.props;
    return (
      <Fragment>
        <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
        <div className="menu-container">
          <div>
            <GiHamburgerMenu
              size={17}
              onClick={() => {
                openNavModal();
              }}
              className="menu-icon"
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MapBox;
