import React, { Component, Fragment } from "react";
import { GiHamburgerMenu, GiTriquetra } from "react-icons/gi";
import mapboxgl from "mapbox-gl";
import "../../css/mapbox.css";

import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import Pin from "./pin";

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
    };

    this.mapBoxRef = React.createRef();
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

  componentWillUnmount() {
    // return null
    this.setState = (state, callback) => {
      return;
    };
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
      </Fragment>
    );
  }
}

export default MapBox;
