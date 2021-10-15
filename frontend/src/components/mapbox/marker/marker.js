import mapboxgl from "mapbox-gl";

/**
 *
 *
 * Create a mapbox marker instance
 */

let marker = () => {
  let newVenueMarker = new mapboxgl.Marker();
  return newVenueMarker;
};

export default marker;
