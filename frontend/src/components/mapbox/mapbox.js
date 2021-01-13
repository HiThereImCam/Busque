import React, { Component, Fragment } from "react";
import mapboxgl from "mapbox-gl";
import "../../css/mapbox.css";

import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import defaultMarkers from "../../config/defaultMarkers";

const REACT_APP_MAPBOX_KEY = process.env.REACT_APP_MAPBOX_KEY;

mapboxgl.accessToken = REACT_APP_MAPBOX_KEY;

class MapBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -122.4363143,
      lat: 37.7461108,
      zoom: 12,
      markerColor: "#4CBB17",
    };
    this.marker = new mapboxgl.Marker();
    this.mapBoxRef = React.createRef();
    this.buttonRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    window.handleClick = this.handleClick;
  }

  componentDidMount() {
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

    const popup = new mapboxgl.Popup()
    

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

    defaultMarkers.coordinates.forEach((coordinate) => {
      this.marker = new mapboxgl.Marker({
        color: this.state.markerColor,
      })
        .setLngLat(coordinate)
        .addTo(this.map);
      this.marker
        .setPopup(
          new mapboxgl.Popup().setLngLat(coordinate).setHTML(
            `
              <button id="checkIn" onclick="handleClick()" ref=${this.buttonRef.current}>Check in</button>
            `
          )
        )
        .addTo(this.map);
    });
  }

  handleClick = () => {
    let svg = document.getElementsByTagName("svg");
  };

  render() {
    return (
      <Fragment>
        <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
      </Fragment>
    );
  }
}

export default MapBox;
