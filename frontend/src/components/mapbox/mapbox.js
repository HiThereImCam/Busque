import React, { Component, Fragment } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
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
      // markerColor: "#4CBB17",
    };

    this.mapBoxRef = React.createRef();
    this.buttonRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    window.handleClick = this.handleClick;
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
    let { venues, users, isAuthenticated } = this.props;
    if (isAuthenticated) {
      loggedInMarkers(venues, this.map, this.buttonRef, users);
    } else {
      defaultMarkers(venues, this.map);
    }
  

  handleClick(venueID) {
    // id is the venue name
    let { currentUser, checkIn  } = this.props;
    checkIn(venueID, currentUser);
    let venue = findVenue(venueID)
    let coordinate = venue.coordinate;


    let marker = new mapboxgl.Marker({
      color: "red",
    }).setLngLat(coordinate)
      .addTo(map);

    marker.setPopup(
      new mapboxgl.Popup().setLngLat(coordinate).setHTML(
        `
            <h1 class="venueName">${venue.name}</h1>
            <div class="popup-container">
              <img src="${currentUser.picture} height="100" width="100"></img>
              <h2>${currentUser.username}</h2>
            </div>
          `
      )
    )
  }

  findCoordinate(venueID){
    let { venue } = this.props;

    return venues.map(venue => {
      if(venue._id === venueID){
        return venue.coordinate
      }
    })
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
