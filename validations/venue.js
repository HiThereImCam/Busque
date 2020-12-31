const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateVenueInput(data) {
    let errors = {};

    data.type = validText(data.type) ? data.type : '';

    if (!Validator.isDecimal(data.latitude)) {
        errors.latitude = "Coordinates for latitude is required"
    }

    if (!Validator.isDecimal(data.longitude)) {
        errors.longitude = "Coordinates for longitude is required"
    }
    
    if (Validator.isEmpty(data.type)) {
        errors.type = "Text field is required";
    }

    if (!Validator.isBoolean(data.available)) {
        errors.available = "A venue must be either available or not available"
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}