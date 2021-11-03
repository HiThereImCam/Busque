// import { connect } from "react-redux";
// import { openVenueModal } from "../actions/venue_actions";
import { useRef } from "react";
import marker from "../components/mapbox/marker/marker";
import popup from "../components/mapbox/popup/popup";
import "../css/popup.css";
// import "../../css/mapbox.css";

/**
 *
 *
 */

function createNewVenue({ map, resultCoordinates, openVenueModal }) {
  // let { map, resultCoordinates } = props;
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

  // let openModalRef = useRef(openVenueModal);

  // let newVenueButton = `
  //     <button style="margin:3px"onclick="${openModalRef.current}">Create New Venue</button>
  //     `;
  let newVenueBtn = document.createElement("div");
  newVenueBtn.innerHTML = `<button style="margin:3px">Create New Venue</button>`;

  newVenueBtn.addEventListener("click", (e) => {
    openVenueModal();
  });

  marker()
    .setLngLat(resultCoordinates)
    .setPopup(popup().setLngLat(resultCoordinates).setDOMContent(newVenueBtn))
    .addTo(map.current);
  marker().togglePopup();

  // return <div></div>;
}

// const mapDispatchToProps = (dispatch) => ({
//   openVenueModal: () => dispatch(openVenueModal(true)),
// });

// export default connect(mapDispatchToProps)(createNewVenue);

export default createNewVenue;
