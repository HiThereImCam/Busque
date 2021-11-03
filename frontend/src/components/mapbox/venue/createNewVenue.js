// import { useRef } from "react";
import marker from "../marker/marker";
import popup from "../popup/popup";
import mapboxButtons from "../../buttons/mapboxButtons";
import "../../../css/popup.css";
// setDOMContent(htmlNode)
// pass in a ref?

/**
 *
 * I think that this shouldn't have to check for authentication
 *
 *
 * @param {*} param0
 * @returns
 */

function createNewVenue({
  map,
  resultCoordinates,
  openVenueModal,
  isAuthenticated,
}) {
  let button = mapboxButtons(openVenueModal, isAuthenticated);

  marker()
    .setLngLat(resultCoordinates)
    .setPopup(popup().setLngLat(resultCoordinates).setDOMContent(button))
    .addTo(map.current);
  marker().togglePopup();

  return null;
}

export default createNewVenue;
