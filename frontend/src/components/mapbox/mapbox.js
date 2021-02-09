import React, { Component, Fragment } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import mapboxgl from "mapbox-gl";
import "../../css/mapbox.css";

import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import Pin from "./pin";
import Tutorial from "./tutorial_modal";
import checkVenues from "../../config/checkVenues";

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
      show: true,
      resultCoordinate: "",
    };

    this.mapBoxRef = React.createRef();

    window.isAuthenticated = this.props.isAuthenticated;
    this.createNewVenue = this.createNewVenue.bind(this);
    this.marker = new mapboxgl.Marker();
  }

  componentDidMount() {
    this.props.fetchVenues();
    this.props.fetchUsers();

    localStorage.getItem("show") === "undefined"
      ? localStorage.setItem("show", "true")
      : this.setState({ show: JSON.parse(localStorage.getItem("show")) });

    if (window.matchMedia("(max-width: 420px)")) {
      this.setState({
        lng: -122.428,
        lat: 37.5713,
      });
    }

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

    geocoder.on("result", (e) => {
      console.log("e: ", e);
      let resultCoordinates = e.result.geometry.coordinates;
      let coordinatesArray = [resultCoordinates[0], resultCoordinates[1]];
      this.setState({
        resultCoordinate: coordinatesArray,
      });

      let checkCoordinates = checkVenues(this.props.venues, coordinatesArray);

      if (checkCoordinates === false) {
        this.createNewVenue();
      } else {
        console.log("This is checkCoordinates: ", checkCoordinates);
      }
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

  componentWillUnmount() {
    // return null
    this.setState = (state, callback) => {
      return;
    };
  }

  createNewVenue() {
    let htmlContent = `<div>
                        <button> Create New Venue </button>
                       </div>
    `;

    this.newVenueMarker = this.marker;
    this.newVenuePopup = new mapboxgl.Popup();
    this.newVenueMarker
      .setLngLat(this.state.resultCoordinate)
      .setPopup(
        this.newVenuePopup
          .setLngLat(this.state.resultCoordinate)
          .setHTML(htmlContent)
      )
      .addTo(this.map);
    this.newVenueMarker.togglePopup();
  }

  render() {
    let {
      openNavModal,
      venues,
      currentUser,
      checkIn,
      isAuthenticated,
      users,
    } = this.props;
    let { show } = this.state;
    return (
      <Fragment>
        <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
        {this.map === undefined ? (
          ""
        ) : (
          <Fragment>
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
            {venues.length > 0
              ? venues.map((venue) => (
                  <Pin
                    key={venue._id}
                    map={this.map}
                    venue={venue}
                    curLoggedInUser={currentUser}
                    checkIn={checkIn}
                    isAuthenticated={isAuthenticated}
                    users={users}
                  />
                ))
              : ""}
          </Fragment>
        )}

        {show === true ? <Tutorial /> : ""}
      </Fragment>
    );
  }
}

export default MapBox;
