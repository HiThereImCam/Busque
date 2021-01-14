import markerLocations from "./markerLocations";
import mapboxgl from "mapbox-gl";

let loggedInMarkers = (venues, map, buttonRef) => {
  return markerLocations.coordinates.forEach((coordinate) => {
    venues.forEach((venue) => {
      if (JSON.stringify(coordinate) === JSON.stringify(venue.coordinate)) {
        let marker = new mapboxgl.Marker({
          color: "#4CBB17",
        })
          .setLngLat(coordinate)
          .addTo(map);

        marker
          .setPopup(
            new mapboxgl.Popup().setLngLat(coordinate).setHTML(
              `
                <h1>${venue.name}</h1>
                <button id="checkIn" onclick="handleClick()" ref=${buttonRef.current}>Check in</button>
              `
            )
          )
          .addTo(map);
      }
    });
  });
};

export default loggedInMarkers;
