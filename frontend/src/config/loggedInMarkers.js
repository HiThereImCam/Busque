import markerLocations from "./markerLocations";
import mapboxgl from "mapbox-gl";
import unavailableLocation from "./unavailableLocation";

let loggedInMarkers = (venues, map, buttonRef, users) => {
  return markerLocations.coordinates.forEach((coordinate) => {
    venues.forEach((venue) => {
      if (JSON.stringify(coordinate) === JSON.stringify(venue.coordinate)) {
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
                  <button id="${venue._id}"
                          onclick="handleClick(this.id)"
                          ref=${buttonRef.current}>Check in</button>
                `
              )
            )
            .addTo(map);
        } else {
          try {
            unavailableLocation(users);
          } catch (e) {
            console.log("errors: ", e);
          }
        }
      }
    });
  });
};

export default loggedInMarkers;
