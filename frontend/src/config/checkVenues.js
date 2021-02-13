/**
 * This checks the  coordinates of the current venue
 * If the the coordinate exists, it returns true
 * if the coodinate doesn't, return false meaning that the user
 * can create a new venue
 */

let checkVenues = (venues, coordinates) => {
  let sameVenue = false;

  venues.forEach((venue) => {
    if (
      coordinates[0].toString() === venue.coordinate[0].toString() &&
      coordinates[1].toString() === venue.coordinate[1].toString()
    ) {
      sameVenue = true;
    }
  });

  return sameVenue;
};

export default checkVenues;
