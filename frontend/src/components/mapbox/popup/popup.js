import mapboxgl from "mapbox-gl";

/**
 *
 *
 * Create a mapbox marker instance
 */

let popup = () => {
  let newVenuePopup = new mapboxgl.Popup();
  return newVenuePopup;
};

export default popup;
