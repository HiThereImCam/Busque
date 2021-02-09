const validText = require("./valid-text");
const Validator = require("validator");

module.exports = function validateLikeInput(data) {
  let errors = {};

  // CHECK IF DATA IS A VALID STRING_DECODER
  data.likerId = validText(data.likerId) ? data.likerId : "";
  data.venueId = validText(data.venueId) ? data.venueId : "";

  // CHECK IF THE DATA IS EMPTY

  if (Validator.isEmpty(data.likerId)) {
    errors.likerId = "Author Id is required";
  }
  
  if (Validator.isEmpty(data.recipeId)) {
    errors.recipeId = "Venue Id is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
