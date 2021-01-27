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
            <div className="popUp">
              <h1 className="popUp-venueName">${unavailableVenue.name}</h1>
              <p className="popUp-userName">${
                users[unavailableVenue.currentUser[0]].username
              }</p>
              <img src=${users[unavailableVenue.currentUser[0]].imageURL}></img>
            </div>  
          `
        )
      )
      .addTo(map);
  });
};

export default unavailableLocation;
