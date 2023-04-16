const mongoose = require('mongoose')

const SignInLoginDetails = new mongoose.Schema({
    Username: String,
    Password: String,
    Email: String,
})

module.exports = mongoose.model("newLogin", SignInLoginDetails)