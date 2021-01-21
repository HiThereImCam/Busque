// returns an array with venues who's availablilities are set to false

let checkedInVenues = (venues) => {
  let unavailable = venues.map((venue) => {
    if (!venue.available) {
      return venue;
    }
  });
  return unavailable;
};

export default checkedInVenues;
