import markerLocations from "./markerLocations";
import mapboxgl from "mapbox-gl";

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
                <button id="${venue.name}"
                        onclick="handleClick(this.id)"
                        ref=${buttonRef.current}>Check in</button>
              `
              )
            )
            .addTo(map);
        } else {
        }
      }
    });
  });
};

export default loggedInMarkers;
