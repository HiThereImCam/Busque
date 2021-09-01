import React, { useRef, useReducer, useEffect, useState } from "react";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "../../css/mapbox.css";

const REACT_APP_MAPBOX_KEY = process.env.REACT_APP_MAPBOX_KEY;

mapboxgl.accessToken = REACT_APP_MAPBOX_KEY;

function Mapbox(props) {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      lng: -122.4363143,
      lat: 37.7461108,
      zoom: 12,
      isCheckedIn: false,
      resultCoordinate: "",
      newestVenuePopup: "",
      createdVenue: false,
    }
  );

  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // intialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [state.lng, state.lat],
      zoom: state.zoom,
    });
  });

  return <div ref={mapContainer} className="map-container" />;
}

export default Mapbox;
