import { model, Schema } from "mongoose";

const LINK_REGEX =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const postSchema = new Schema(
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
const post = model("Post", postSchema);
export default post;
