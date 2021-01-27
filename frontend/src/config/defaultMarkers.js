import markerLocations from "./markerLocations";
import unavailableLocation from "./unavailableLocation";
import checkedInVenues from "./checkedInVenues";

import mapboxgl from "mapbox-gl";

let defaultMarkers = (venues, map, users) => {
  // return Object.values(markerLocations.coordinates).forEach((coordinate) => {
  // });
  let unavailableVenues = checkedInVenues(venues);
  venues.forEach((venue) => {
    //if (JSON.stringify(coordinate) === JSON.stringify(venue.coordinate)) {
    let { coordinate } = venue;
    let marker = new mapboxgl.Marker({
      color: "#4CBB17",
    })
      .setLngLat(coordinate)
      .addTo(map);
    if (venue.available) {
      marker
        .setPopup(
          new mapboxgl.Popup().setLngLat(coordinate).setHTML(
            `
                    <h1>${venue.name}</h1>
                    <p>Please log in to check into this location</p>
                `
          )
        )
        .addTo(map);
    } else {
      try {
        unavailableLocation(users, unavailableVenues, map);
      } catch (e) {
        console.log("errors: ", e);
      }
    }
    //}
  });
};

export default defaultMarkers;

// marker
//   .setPopup(
//     new mapboxgl.Popup().setLngLat(coordinate).setHTML(
//       `
//               <h1>${venue.name}</h1>
//               <div>
//                 <h1></h1>
//               </div>
//           `
//     )
//   )
//   .addTo(map);
