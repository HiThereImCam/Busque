const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateRegisterInput(data) {
    let errors = {};
    
    data.username = validText(data.username) ? data.username : '';
    data.email = validText(data.email) ? data.email : '';
    data.password = validText(data.password) ? data.password : '';

    if (Validator.isLength(data.username, { min: 3, max: 15})) {
        errors.username = "Username field must be between 3 and 15 characters"
    }

    if (Validator.isEmpty(data.username)) {
        errors.username = "Username field is required";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password is required";
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be between 6 and 30 characters";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}