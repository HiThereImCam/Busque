import mapboxgl from "mapbox-gl";
import "../../css/mapbox.css";

/**
 * 
 *     this.marker = new mapboxgl.Marker();

 * 
 * props needed
 * 
 * this.map = current instance of map
 * 
 */

let createNewVenue = () => {
  let { isAuthenticated } = this.props;
  let htmlContent;
  if (isAuthenticated) {
    htmlContent = `<div>
                        <button onclick="openVenueModal()">Create New Venue</button>
                      </div>
    `;
  } else {
    htmlContent = `
        <div>
          <button onclick="redirectLogin()" ref=${this.buttonVenueRef.current}>Login to create a new venue</button>
        </div>
      `;
  }

  this.newVenueMarker = this.marker;
  this.newVenuePopup = new mapboxgl.Popup();
  this.setState({
    newestVenuePopup: this.newVenuePopup,
    createdVenue: true,
  });

  this.newVenueMarker
    .setLngLat(this.state.resultCoordinate)
    .setPopup(
      this.newVenuePopup
        .setLngLat(this.state.resultCoordinate)
        .setHTML(htmlContent)
    )
    .addTo(this.map);
  this.newVenueMarker.togglePopup();
};

export default createNewVenue;
