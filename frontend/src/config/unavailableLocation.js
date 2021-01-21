import mapboxgl from "mapbox-gl";

let unavailableLocation = (users, unavailableVenues, map) => {
  console.log("here");
  console.log("unavailableVenues: ", unavailableVenues);
  console.log("users: ", users);
  return unavailableVenues.forEach((unavailableVenue) => {
    let marker = new mapboxgl.Marker({
      color: "red",
    })
      .setLngLat(unavailableVenue.coordinate)
      .addTo(map);

    marker
      .setPopup(
        new mapboxgl.Popup().setLngLat(unavailableVenue.coordinate).setHTML(
          `
                <h1>${users[unavailableVenue.currentUser[0]].username}</h1>
                
              `
        )
      )
      .addTo(map);
  });
};

export default unavailableLocation;
