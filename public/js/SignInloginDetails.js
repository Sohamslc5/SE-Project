const mongoose = require('mongoose')

const SignInLoginDetails = new mongoose.Schema({
    Username: String,
    Password: String,
    Email: String,
    Fullname: String,
    Enrollment : String,
    MobileNum: String,
    isAdmin: String,
})

module.exports = mongoose.model("newLogin", SignInLoginDetails)