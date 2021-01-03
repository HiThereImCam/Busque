import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import "../../css/mapbox.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const { REACT_APP_MAPBOX_KEY } = process.env;

mapboxgl.accessToken = REACT_APP_MAPBOX_KEY;

class MapBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -122.4363143,
      lat: 37.7461108,
      zoom: 12,
      //marker: "",
    };
    this.marker = new mapboxgl.Marker();
    // this.dropPin = this.dropPin.bind(this);
  }

  /**
   * Possibly create util
   */

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

    const geocoder = new MapboxGeocoder({
      container: this.geocoder,
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });
    this.map.addControl(geocoder, "top-left");

    this.map.on("click", (e) => {
      this.marker.remove();
      e.preventDefault();
      let { lng, lat } = e.lngLat;
      console.log([lng, lat]);
      this.marker.setLngLat([lng, lat]).addTo(this.map);
    });

    this.map.on("move", () => {
      this.setState({
        lng: this.map.getCenter().lng.toFixed(4),
        lat: this.map.getCenter().lat.toFixed(4),
        zoom: this.map.getZoom().toFixed(2),
      });
    });
  }

  render() {
    return (
      <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
    );
  }
}

export default MapBox;
