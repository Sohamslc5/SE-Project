const mongoose = require("mongoose");
const LINK_REGEX =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const projectSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        desc: { type: String },
        degree: {type : String},
        date : {type : String},
        link: { type: String, match: LINK_REGEX },
        author : {type : String},
	    authLink : {type : String , match : LINK_REGEX}
    },
    { timestamps: true }
);

const project = mongoose.model("project", projectSchema);
module.exports = project;
