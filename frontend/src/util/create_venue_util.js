import mapboxgl from "mapbox-gl";
// import "../../css/mapbox.css";

/**
 * 
 * this is a marker and button
 * 
 *     this.marker = new mapboxgl.Marker();

 * 
 * props needed
 * 
 * this.map = current instance of map
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

  let newVenueMarker = new mapboxgl.Marker();
  //   this.newVenuePopup = new mapboxgl.Popup();
  //   this.setState({
  //     newestVenuePopup: this.newVenuePopup,
  //     createdVenue: true,
  //   });

  //   newVenueMarker
  //     .setLngLat(resultCoordinates)
  //     .setPopup(
  //       this.newVenuePopup
  //         .setLngLat(this.state.resultCoordinate)
  //         .setHTML(htmlContent)
  //     )
  //     .addTo(map.current);
  //   newVenueMarker.togglePopup();
  console.log("create_venue_util line 47 props: ", props);
};

export default createNewVenue;
