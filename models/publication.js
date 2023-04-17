const mongoose = require("mongoose");
const LINK_REGEX =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const postSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        desc: { type: String },
        links: [{ type: String, match: LINK_REGEX }],
        people: [
            {
                name: String,
                link: {
                    type: String,
                    match: LINK_REGEX,
                },
            },
        ],
    },
    { timestamps: true }
);
const post = mongoose.model("Post", postSchema);
module.exports = post;
