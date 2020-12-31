import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import { MapboxStyleSwitcherControl } from "mapbox-gl-style-switcher";
import "mapbox-gl-style-switcher/styles.css";
import "../../css/mapbox.css";
import "../../css/header.css";

import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';


const { REACT_APP_MAPBOX_KEY } = process.env;

mapboxgl.accessToken = REACT_APP_MAPBOX_KEY;

class MapBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -122.4194,
      lat: 37.7788,
      zoom: 12,
    };
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });

    map.addControl(new MapboxStyleSwitcherControl());
    
    // const nav = new mapboxgl.NavigationControl(); 
    // map.addControl(nav, 'top-left')

    const geocoder = new MapboxGeocoder({
      container: this.geocoder,
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    })
    // map.addControl(geocoder, 'top-left')
    document.getElementById('geocoder').appendChild(geocoder.onAdd(map))

    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });
  }

  render() {
    return (
      <div>
        <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
        {/* <div ref={(el) => (this.geocoder = el)} className="geocoder" placeholder="THIS IS THE PLACEHOLDER"></div> */}
        <div id='geocoder' class='header-left geocoder'></div>
      </div>
    );
  }
}

export default MapBox;
