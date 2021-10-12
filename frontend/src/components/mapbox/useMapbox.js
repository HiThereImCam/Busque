import React, { useRef, useReducer, useEffect, Fragment } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "../../css/mapbox.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import checkVenues from "../../config/checkVenues";
import createNewVenue from "../../util/create_venue_util";
import mapboxButtons from "../buttons/mapboxButtons";

const REACT_APP_MAPBOX_KEY = process.env.REACT_APP_MAPBOX_KEY;

mapboxgl.accessToken = REACT_APP_MAPBOX_KEY;

function Mapbox(props) {
  const { setVenueNameAndCoordinates, venues } = props;

  console.log(
    "setVenueNameAndCoordinates line 20: ",
    setVenueNameAndCoordinates
  );

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

  const geocoder = useRef(null);
  const openNavModal = props.openNavModal;

  // create new instance of map
  useEffect(() => {
    if (map.current) return; // intialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [state.lng, state.lat],
      zoom: state.zoom,
    });
  });

  // storing new coordinates when the map moves
  useEffect(() => {
    if (!map.current) return;

    map.current.on("move", () => {
      setState({
        lng: map.current.getCenter().lng.toFixed(4),
        lat: map.current.getCenter().lat.toFixed(4),
        zoom: map.current.getZoom().toFixed(2),
      });
    });
  });

  // // add MapboxGeocoder

  useEffect(() => {
    if (!map.current) return;

    geocoder.current = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });

    map.current.addControl(geocoder.current, "top-left");

    console.log("geocoder.current: ", geocoder.current);
    // return () => geocoder.current.remove();
  }, []);

  // store geocoder coordinates

  useEffect(() => {
    if (!map.current) return;

    geocoder.current.on("result", (e) => {
      let resultCoordinates = [
        e.result.geometry.coordinates[0],
        e.result.geometry.coordinates[1],
      ];

      setState({ resultCoordinate: resultCoordinates });

      // if venue dne, create new venue
      if (checkVenues(venues, resultCoordinates)) {
        setVenueNameAndCoordinates({
          coordinates: e.result.geometry.coordinates,
          venueName: e.result.text,
        });
        createNewVenue({ map, resultCoordinates });
      }
    });
  });

  return (
    <Fragment>
      <div ref={mapContainer} className="map-container" />
      <div className="menu-container">
        <div>
          <GiHamburgerMenu
            size={17}
            onClick={openNavModal}
            className="menu-icon"
          />
        </div>
      </div>
    </Fragment>
  );
}

export default Mapbox;
