import React from "react";
import mapboxgl from "mapbox-gl";
import { MapboxStyleSwitcherControl } from "mapbox-gl-style-switcher";
import "mapbox-gl-style-switcher/styles.css";
import "../../css/main_page.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYnVzcXVlIiwiYSI6ImNraXV1bnVsbTMwZ3Myc3BkN3Y1dzA5cDYifQ.YjWFqdAWPOmKH7oLwBDKWA";

// const styles: MapboxStyleDefinition[] = [
//   {
//     title: "Dark",
//     uri: "mapbox://styles/mapbox/dark-v9",
//   },
//   {
//     title: "Light",
//     uri: "mapbox://styles/mapbox/light-v9",
//   },
// ];

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -122.4194,
      lat: 37.7788,
      zoom: 10,
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
      </div>
    );
  }
}

export default MainPage;
