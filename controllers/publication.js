import post from "../models/publication.js";

export const addNewPost = async (req, res) => {
    let title = req.body.title,
        desc = req.body.desc,
        links = req.body.links,
        pnames = req.body.peoplename,
        plinks = req.body.peoplelink,
    if (
        title !== undefined &&
        title !== ""
    ) {
        let newPost = new post({
            title: title,
            desc: desc,
        });
        if (typeof links === typeof "text") {
            newPost.links.push(links);
        } else {
            for (let i = 0; i < links.length || 0; i++) {
                newPost.links.push(links[i]);
            }
        }
        if (typeof pnames === typeof "text") {
            newPost.people.push({
                name: pnames,
                link: plinks,
            });
        } else {
            for (let i = 0; i < pnames.length || 0; i++) {
                newPost.people.push({
                    name: pnames[i],
                    link: plinks[i],
                });
            }
        }
        await newPost.save();
        console.log("New Post Added");
        return res.redirect("/admin");
    }
    return res.redirect("/admin");
};
