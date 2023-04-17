var express = require("express");
const PORT = 5000;
var bodyParse = require("body-parser");
var mongoose = require("mongoose");
const myModule = require("./public/js/faculty");
const app = express();
const ejs = require("ejs");
import publicationRouter from "./routes/publications.routes.js"
const newFaculty = require("./faculty_schema");
const newSignIn = require("./SignInloginDetails");
const fs = require('fs');
app.set("html", __dirname + "/public");
app.use(bodyParse.json());
app.use(express.static("public"));
app.use(
    bodyParse.urlencoded({
        extended: true,
    })
);

app.set("view engine", "ejs");
// qc1QqUQWCg6caAxZ
const url = `mongodb+srv://akshat8:qc1QqUQWCg6caAxZ@cluster0.6ggnksx.mongodb.net/?retryWrites=true&w=majority`;

// const url = `mongodb://127.0.0.1:27017/SERL_IIITA`;

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(url, connectionParams)
    .then(() => {
        console.log("Connected to database ");
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });
var db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error"));
db.once("open", function (callback) {
    console.log("connection succeeded");
});

app.post("/facultylogin", (req, res) => {
    try{
        var name = req.body.name;
        var email = req.body.email;
        var another_mail = req.body.anotheremail;
        var post = req.body.post;
        var collegename = req.body.CollegeName;
        var address = req.body.address;
        var phoneNumber = req.body.phone;
        var Office_Phone = req.body.officephone;
        var pfp = req.body.pfp;
        var interest1 = req.body.interest1;
        var interest2 = req.body.interest2;
        var interest3 = req.body.interest3;
        run();
        async function run() {
            const user = await newFaculty.create({
                name: name,
                College_email: email,
                Personal_email: another_mail,
                Post: post,
                Collegename: collegename,
                address: address,
                phone_number: phoneNumber,
                office_number: Office_Phone,        
                photo: pfp,
                Interests1: interest1,
                Interests2: interest2,
                Interests3: interest3
            });
            console.log(user);
        }
        res.render("../public/html/Faculty", {user: user});
    }catch(e){
        console.log(e);
    }
});

app.post("/sign_up", (req, res) => {
    try {
        var username = req.body.username;
        var email = req.body.email;
        var pass = req.body.password;
        run();
        async function run() {
            const addSignin = await newSignIn.create({
                Username: username,
                Email: email,
                Password: pass,
            });
            console.log(addSignin);
        }
        res.sendFile(__dirname + "/public/html/index.html");
    } catch (e) {
        console.log(e);
    }
});

app.post("/login", (req, res) => {
    try {
        var username = req.body.username;
        var password = req.body.password;
        run();
        async function run() {
            const curr_user = await newSignIn.findOne({ Username: username });
            if (!curr_user) {
                res.send("user not found");
            } else if (curr_user.Password == password) {
                console.log(username);
                console.log("login successful");
                res.sendFile(__dirname + "/public/html/index.html");
            } else {
                res.send("password not match");
            }
        }
    } catch (e) {
        console.error(e);
    }
});

app.get("/html/Faculty", function (req, res) {
    try {
        run();
        async function run(){
            const user = await newFaculty.find({});
            res.render("../public/html/Faculty",  {user: user});
        }
    }catch(e){
        console.log(e);
    }
});

app.get("/Faculty", function (req, res) {
    try {
        run();
        async function run(){
            const user = await newFaculty.find({});
            console.log(user);
            res.render("../public/html/Faculty", {user: user});
        }
    }catch(e){
        console.log(e);
    }
});

app.get("/", function (req, res) {
        res.set({
            "Access-control-Allow-Origin": "*",
        });
        // return res.redirect('html/index.html');
        res.sendFile(__dirname + "/public/html/index.html");
    })
    .listen(5000);
console.log("server listening at port 5000");

app.use("/publications",publicationRouter)
