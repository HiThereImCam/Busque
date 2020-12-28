const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateRegisterInput(data) {
    let errors = {};
    
    data.username = validText(data.username) ? data.username : '';
    data.email = validText(data.email) ? data.email : '';
    data.password = validText(data.password) ? data.password : '';

    if (Validator.isLength(data.username, { min: 3, max: 15})) {
        errors.username = "Username field must be betwee 3 and 15 characters"
    }

    if (Validator.isEmpty(data.username)) {
        errors.username = "Username field is required";
    }
}