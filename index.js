var express = require("express");
var bodyParse = require("body-parser");
var mongoose = require("mongoose");
const app = express();
const newPublication = require("./public/js/publication");
const newFaculty = require("./public/js/faculty_schema");
const newSignIn = require("./public/js/SignInloginDetails");
const newResearcher = require("./public/js/researcher_schema");
const ejs = require("ejs");
const project = require("./public/js/project_schema");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const saltRounds = 10;
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

mongoose
    .connect(url, connectionParams)
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
    try {
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
                Interests3: interest3,
            });
            res.redirect('/Faculty');
        }
    } catch (e) {
        console.log(e);
    }
});

app.post("/addPublication", (req, res) => {
    try {
        var title = req.body.title;
        var desc = req.body.desc;
        var link = req.body.links;
        var author = req.body.peoplename;
        var authLink = req.body.peoplelink;
        var mentor_name = req.body.mentor;
        var enrol = req.body.enrol;
        run();
        async function run() {
            const Publication_data = await newPublication.create({
                title: title,
                desc: desc,
                link: link,
                author: author,
                authLink: authLink,
                mentor_name: mentor_name,
                enrol_num: enrol,
            });
            res.redirect('/Publication');
        }
    } catch (e) {
        console.log(e);
    }
});
app.post("/addProject", (req, res) => {
    try {
	var title = req.body.title;
	var desc = req.body.desc;
    var degree = req.body.degree;
    var date = req.body.datepicker;
	var link = req.body.links;
    var enrol = req.body.enrol;
	var author = req.body.peoplename;
	var authLink = req.body.peoplelink;
        run();
        async function run() {
            const newProject = await project.create({
                title : title,
                desc : desc,
                degree : degree,
                date : date,
                link : link,
                author : author,
                authLink : authLink,
                enrol_num: enrol,
            });
            res.redirect("/Projects");
        }
    } catch (e) {
        console.log(e);
    }
});

app.post("/Researcher_add", (req, res) => {
    try {
        var name = req.body.name;
        var c_mail = req.body.email;
        var p_mail = req.body.anotheremail;
        var Mentor = req.body.mentor;
        var p_num = req.body.phone;
        var bio = req.body.bio;
        var cur_res = req.body.curr_Research;
        var res_pfp = req.body.pfp;
        var roll = req.body.RollNumber;
        run();
        async function run() {
            const researcher_data = await newResearcher.create({
                researcher_Name: name,
                researcher_CollegeMail: c_mail,
                researcher_PersonalMail: p_mail,
                researcher_Bio: bio,
                researcher_Curr_Research: cur_res,
                researcher_Mentor_Name: Mentor,
                researcher_Profile_Pic: res_pfp,
                researcher_Mobile_Number: p_num,
                researcher_roll_Num: roll,
            });
            res.redirect('/Researchers');
        }
    } catch (e) {
        console.log(e);
    }
});

app.post("/sign_up", async (req, res) => {
    try {
        var username = req.body.username;
        var email = req.body.email;
        var pass = req.body.password;
        var fullname = req.body.fullname;
        var enrolment = req.body.enrolment;
        var mobileno = req.body.mobileno;
        var isAdmin = req.body.isAdmin;
        var isFaculty = req.body.isFaculty;
        
        const user = await newSignIn.findOne({ Username: username });
        if(user){
            return res.json({error : "User exist"});
        }
        run();
        async function run() {
            const hash = await bcrypt.hash(pass,saltRounds);
            const addSignin = await newSignIn.create({
                Username: username,
                Email: email,
                Password: hash,
                Fullname: fullname,
                Enrollment: enrolment,
                MobileNum: mobileno,
                isAdmin: isAdmin,
                isFaculty: isFaculty,
            });
        }
        if (res.status(201)) {
            return res.json({ status: "ok", data: isAdmin });
        } else {
            return res.json({ error: "error" });
        }
    } catch (e) {
        console.log(e);
    }
});

let jwtSecretKey = "serl_jwt_secret_key";

app.post("/login", async (req, res) => {
    try {
        var username = req.body.username;
        var password = req.body.password;

        const user = await newSignIn.findOne({ Username: username });
        if (!user) {
            return res.json({ error: "User not found" });
        }
        const validPass = await bcrypt.compare(password,user.Password);
        if (validPass) {
            console.log("login successful");
            const token = jwt.sign({ Username: user.Username }, jwtSecretKey);
            if (res.status(201)) {
                return res.json({ status: "ok", data: token });
            } else {
                return res.json({ error: "error" });
            }
        }
        return res.json({ error: "Invalid Password" });
    } catch (e) {
        console.error(e);
    }
});

app.post("/userdata", async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, jwtSecretKey);
        const username = user.Username;
        newSignIn
            .findOne({ Username: username })
            .then((data) => {
                res.send({ status: "ok", data: data });
            })
            .catch((error) => {
                res.send({ status: "error", data: error });
            });
    } catch (error) {
        console.log(error);
    }
});

app.get("/Faculty", function (req, res) {
    try {
        run();
        async function run() {
            const user = await newFaculty.find({});
            res.render("../public/html/Faculty", { user: user });
        }
    } catch (e) {
        console.log(e);
    }
});

app.get("/Researchers", function (req, res) {
    try {
        run();
        async function run() {
            const researcher_data = await newResearcher.find({});
            res.render("../public/html/Researchers", {
                researcher_data: researcher_data,
            });
        }
    } catch (e) {
        console.log(e);
    }
});
app.get("/Publication", function (req, res) {
    try {
        run();
        async function run() {
            const Publication_data = await newPublication.find({});
            res.render("../public/html/Publication", {
                Publication_data: Publication_data,
            });
        }
    } catch (e) {
        console.log(e);
    }
});


app.get("/Projects",function(req,res){
    try {
        run();
        async function run() {
            const projects = await project.find({});
            res.render("../public/html/Projects", { projects: projects });
        }
    } catch (e) {
        console.log(e);
    }
})
app.get("/user_profile",(req,res)=>{
    res.render("../public/html/user_profile");
});

app.get("/contactus",(req,res)=>{
    res.sendFile(__dirname + "/public/html/contact_us.html");
})
app.get("/resources",(req,res)=>{
    res.sendFile(__dirname + "/public/html/resources.html");
})
app.get("/Login",(req,res)=>{
    res.sendFile(__dirname + "/public/html/login.html");
})
app
    .get("/", function (req, res) {
        res.set({
            "Access-control-Allow-Origin": "*",
        });
        res.sendFile(__dirname + "/public/html/index.html");
    })
    .listen(5000);
console.log("server listening at port 5000");
