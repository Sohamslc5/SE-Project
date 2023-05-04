const mongoose = require('mongoose')
const researcher_schema = new mongoose.Schema({
    researcher_Name: String,
    researcher_CollegeMail: String, 
    researcher_PersonalMail: String,
    researcher_roll_Num: String,
    researcher_Mentor_Name: String,
    researcher_Mobile_Number: String,
    researcher_Bio: String,
    researcher_Curr_Research: String,
    researcher_Profile_Pic: Buffer
})
module.exports = mongoose.model("newResearcher", researcher_schema);