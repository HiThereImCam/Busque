/**
 * This checks the the coordinates of the current venue
 * If the the coordinate exists, it returns true
 * if the coodinate doesn't, return false meaning that the user
 * can create a new venue
 */

let checkVenues = (venues, coordinates) => {
  console.log("Venues: ", venues);
  console.log("Coordinates: ", coordinates);
  venues.forEach((venue) => {
    if (
      coordinates[0] === venue.coordinate[0] &&
      coordinates[1] === venue.coordinate[1]
    ) {
      return true;
    }
  });

  return false;
};

export default checkVenues;
