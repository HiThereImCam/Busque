import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import { MapboxStyleSwitcherControl } from "mapbox-gl-style-switcher";
import "mapbox-gl-style-switcher/styles.css";
// import ReactMapGL from "react-map-gl";
import "../../css/mapbox.css";

const { REACT_APP_MAPBOX_KEY } = process.env;

mapboxgl.accessToken = REACT_APP_MAPBOX_KEY;

class MapBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -122.4363143,
      lat: 37.7461108,
      zoom: 12,
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleClickorMove = this.handleClickorMove.bind(this);
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

    this.map.addControl(new MapboxStyleSwitcherControl());

    this.map.on("move", () => {
      this.setState({
        lng: this.map.getCenter().lng.toFixed(4),
        lat: this.map.getCenter().lat.toFixed(4),
        zoom: this.map.getZoom().toFixed(2),
      });
    });
  }

  handleMouseDown(e) {
    window.checkForDrag = e.clientX;
  }

  handleClickorMove() {
    const marker = new mapboxgl.Marker();
    marker.remove();
    this.map.on("click", (e) => {
      e.preventDefault();

      let { lng, lat } = e.lngLat;
      console.log([lng, lat]);
      marker.setLngLat([lng, lat]).addTo(this.map);
    });
  }

  render() {
    return (
      <div>
        <div
          onClick={() => this.handleClickorMove()}
          ref={(el) => (this.mapContainer = el)}
          className="mapContainer"
        />
      </div>
    );
  }
}

export default MapBox;
