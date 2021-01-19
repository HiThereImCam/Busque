import markerLocations from "./markerLocations";
import mapboxgl from "mapbox-gl";

let defaultMarkers = (venues, map, buttonRef) => {
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
                    <p>Available!</p>
                `
              )
            )
            .addTo(map);
        } else {
          marker
            .setPopup(
              new mapboxgl.Popup().setLngLat(coordinate).setHTML(
                `
                    <h1>${venue.name}</h1>
                    <p>Not Available!</p>
                `
              )
            )
            .addTo(map);
        }
      }
    });
  });
};

export default defaultMarkers;
