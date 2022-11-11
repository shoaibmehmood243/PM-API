const joi = require('joi');

const Signup = joi.object({
    "user_email": joi.string().trim().email().lowercase().required().prefs({"messages": {"any.required": "Email is required.",'string.email': 'Email must be valid.'}}),
    "username": joi.string().required().trim().prefs({"messages": {"any.required": "Username is required."}}),
    "password": joi.string().required().min(8).trim().prefs({"messages": {"any.required": "Password is required.","string.min": "Password length must be 8 characters."}}),
    "number": joi.number().required().prefs({"messages": {"any.required": "Phone Number is required."}})
});

module.exports = {
    Signup
}