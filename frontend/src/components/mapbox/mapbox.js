import React, { Component, Fragment } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import mapboxgl from "mapbox-gl";
import "../../css/mapbox.css";

import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import Pin from "./pin";
import checkVenues from "../../config/checkVenues";
import { Link } from "react-router-dom";
import VenueModal from "./venue_modal";

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
      resultCoordinate: "",
      newestVenuePopup: "",
      createdVenue: false,
    };

    this.mapBoxRef = React.createRef();
    this.createNewVenue = this.createNewVenue.bind(this);
    this.marker = new mapboxgl.Marker();
    this.redirectLogin = this.redirectLogin.bind(this);
    this.buttonVenueRef = React.createRef();

    window.isAuthenticated = this.props.isAuthenticated;
    window.redirectLogin = this.redirectLogin;
    window.openVenueModal = this.props.openVenueModal;
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
      let resultVenueName = e.result.text;
      let venNameAndCoord = {
        coordinates: resultCoordinates,
        venueName: resultVenueName,
      };

      let coordinatesArray = [resultCoordinates[0], resultCoordinates[1]];
      this.setState({
        resultCoordinate: coordinatesArray,
      });

      let checkCoordinates = checkVenues(this.props.venues, coordinatesArray);

      if (checkCoordinates === false) {
        this.props.setVenNameAndCoordinate(venNameAndCoord);
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
    let { isAuthenticated } = this.props;
    let htmlContent;
    if (isAuthenticated) {
      htmlContent = `<div>
                        <button onclick="openVenueModal()">Create New Venue</button>
                      </div>
    `;
    } else {
      htmlContent = `
        <div>
          <button onclick="redirectLogin()" ref=${this.buttonVenueRef.current}>Login to create a new venue</button>
        </div>
      `;
    }

    this.newVenueMarker = this.marker;
    this.newVenuePopup = new mapboxgl.Popup();
    this.setState({
      newestVenuePopup: this.newVenuePopup,
      createdVenue: true,
    });

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

  redirectLogin() {
    let goToLogin = document.getElementById("redirectToLogin");
    goToLogin.click();
  }

  render() {
    let {
      openNavModal,
      venues,
      currentUser,
      checkIn,
      isAuthenticated,
      users,
      venueModal,
      checkUserIn,
    } = this.props;
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
                    venues={venues}
                    curLoggedInUser={currentUser}
                    checkIn={checkIn}
                    isAuthenticated={isAuthenticated}
                    users={users}
                    checkUserIn={checkUserIn}
                    newestVenuePopup={this.state.newestVenuePopup}
                    createdVenue={this.state.createdVenue}
                  />
                ))
              : ""}
          </Fragment>
        )}
        {venueModal === true ? <VenueModal /> : ""}
        <Link to="/login" id="redirectToLogin" />;
      </Fragment>
    );
  }
}

export default MapBox;
