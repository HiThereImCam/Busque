/**
 * This checks the  coordinates of the current venue
 * If the the coordinate exists, do not create a new venue (false)
 * if the coodinate doesn't, create a new venue (true)
 */

let checkVenues = (venues, coordinates) => {
  let createNewVenue = true;

  venues.forEach((venue) => {
    if (
      coordinates[0].toString() === venue.coordinate[0].toString() &&
      coordinates[1].toString() === venue.coordinate[1].toString()
    ) {
      createNewVenue = false;
    }
  });

  return createNewVenue;
};

export default checkVenues;
