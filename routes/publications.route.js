const express = require("express");
const router = express.Router();
const addNewPost = require("../controllers/publication.js");
router.post("/newpost", addNewPost);
module.exports = router;
