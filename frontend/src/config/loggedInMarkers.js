import markerLocations from "./markerLocations";
import mapboxgl from "mapbox-gl";
import checkedInVenues from "./checkedInVenues";
import unavailableLocation from "./unavailableLocation";

let loggedInMarkers = (venues, map, buttonRef, users) => {
  // let unavailableVenues = checkedInVenues(venues);

  return venues.forEach((venue) => {
    let { coordinate } = venue;
    let marker = new mapboxgl.Marker({
      color: "#4CBB17",
    })
      .setLngLat(coordinate)
      .addTo(map);

    marker._element.id = venue._id;
    let venueId = venue._id;

    marker._element.id === venueId
      ? (window.venueId = marker)
      : console.log("elements do not match ");

    if (venue.available) {
      marker
        .setPopup(
          new mapboxgl.Popup().setLngLat(coordinate).setHTML(
            `
                  <h1>${venue.name}</h1>
                  <button id = "${venue.name}"
                          onclick="handleCheckIn(this.id)"
                          ref=${buttonRef.current}>Check in</button>
                `
          )
        )
        .addTo(map);
    } else {
      try {
      } catch (e) {
        console.log("errors: ", e);
      }
    }
  });
};

export default loggedInMarkers;
