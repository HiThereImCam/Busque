import mapboxgl from "mapbox-gl";
import marker from "../components/mapbox/marker/marker";
import popup from "../components/mapbox/popup/popup";

import "../css/popup.css";
// import "../../css/mapbox.css";

/**
 *
 *
 */

let createNewVenue = (props) => {
  const { map, resultCoordinates } = props;

  //   let { isAuthenticated } = this.props;
  //   let htmlContent;
  //   if (isAuthenticated) {
  //     htmlContent = `<div>
  //                         <button onclick="openVenueModal()">Create New Venue</button>
  //                       </div>
  //     `;
  //   } else {
  //     htmlContent = `
  //         <div>
  //           <button onclick="redirectLogin()" ref=${this.buttonVenueRef.current}>Login to create a new venue</button>
  //         </div>
  //       `;
  //   }

  //   this.newVenuePopup = new mapboxgl.Popup();
  //   this.setState({
  //     newestVenuePopup: this.newVenuePopup,
  //     createdVenue: true,
  //   });

  let htmlContent = `<div classname="popup">
                          <button onclick="openVenueModal()">Create New Venue</button>
                        </div>
      `;

  marker()
    .setLngLat(resultCoordinates)
    .setPopup(popup().setLngLat(resultCoordinates).setHTML(htmlContent))
    .addTo(map.current);
  marker().togglePopup();
};

export default createNewVenue;
