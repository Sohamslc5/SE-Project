const mongoose = require('mongoose')

const faculty_schema = new mongoose.Schema({
    name: String,
    College_email: String,
    Personal_email: String,
    Post: String,
    Collegename: String,
    address: String,
    phone_number: Number,
    office_number: Number,
    photo: String,
    Interests1: String,
    Interests2: String,
    Interests3: String
})

module.exports = mongoose.model("newFaculty", faculty_schema)