const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateVenueInput(data) {
    let errors = {};

    data.name = validText(data.name) ? data.name : '';
    data.type = validText(data.type) ? data.type : '';
    data.latitude = validText(data.latitude) ? data.latitude : '';
    data.longitude = validText(data.longitude) ? data.longitude : '';
    data.available = validText(data.available) ? data.available : '';

    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

    if (!Validator.isDecimal(data.latitude)) {
        errors.latitude = "Coordinates for latitude is required"
    }

    if (!Validator.isDecimal(data.longitude)) {
        errors.longitude = "Coordinates for longitude is required"
    }
    
    if (Validator.isEmpty(data.type)) {
        errors.type = "Text field is required";
    }

    // if (!Validator.isBoolean(data.available)) {
    //     errors.available = "A venue must be either available or not available"
    // }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}