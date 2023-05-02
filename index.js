var express = require("express");
const PORT = 5000;
var bodyParse = require("body-parser");
var mongoose = require("mongoose");
// const myModule = require("./public/js/faculty");
const app = express();
const ejs = require("ejs");
const publication = require("./publication");
const project = require("./projects");
const newFaculty = require("./faculty_schema");
const newSignIn = require("./SignInloginDetails");
const fs = require("fs");
const jwt = require("jsonwebtoken");
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
            // console.log(user);
            res.render("../public/html/Faculty", { user: user });
        }
    } catch (e) {
        console.log(e);
    }
});

app.post("/addPublication", async(req, res) => {
    try {
	var title = req.body.title;
	var desc = req.body.desc;
	var link = req.body.links;
	var author = req.body.peoplename;
	var authLink = req.body.peoplelink;
        run();
        async function run() {
            const newPublication = await publication.create({
                title : title,
                desc : desc,
                link : link,
                author : author,
                authLink : authLink,
            });
            await newPublication.save();
        }
        const publications = await publication.find({});
        res.render("../public/html/Publication", { publications: publications });
    } catch (e) {
        console.log(e);
    }
});

app.post("/addProject", async(req, res) => {
    try {
	var title = req.body.title;
	var desc = req.body.desc;
    var degree = req.body.degree;
    var date = req.body.date;
	var link = req.body.links;
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
            });
            await newProject.save();
            console.log(newProject);
        }
        const projects = await project.find({});
        res.render("../public/html/Projects", { projects: projects });
    } catch (e) {
        console.log(e);
    }
});


app.post("/sign_up", (req, res) => {
    try {
        var username = req.body.username;
        var email = req.body.email;
        var pass = req.body.password;
        var fullname = req.body.fullname;
        var enrolment = req.body.enrolment;
        var mobileno = req.body.mobileno;
        run();
        async function run() {
            const addSignin = await newSignIn.create({
                Username: username,
                Email: email,
                Password: pass,
                Fullname: fullname,
                Enrollment: enrolment,
                MobileNum: mobileno,
            });
            // console.log(addSignin);
        }
        res.sendFile(__dirname + "/public/html/login.html");
        // res.redirect('/');
    } catch (e) {
        console.log(e);
    }
});

let jwtSecretKey = "serl_jwt_secret_key";

app.post("/login", async (req, res) => {
    try {
        var username = req.body.username;
        var password = req.body.password;

        const user = await newSignIn.findOne({Username:username});
        if(!user){
            return res.json({error : "User not found"});
        }
        if (user.Password == password){
            console.log("login successful");
            const token = jwt.sign({Username: user.Username},jwtSecretKey);
            // console.log(token);
            // res.redirect('/');
            if(res.status(201)) {
                return res.json({status:"ok", data : token});
            }
            else {
                return res.json({error : "error"});
            }
        }
        return res.json({error: "Invalid Password"});
    } catch (e) {
        console.error(e);
    }
});

app.post("/userdata",async (req,res)=>{
    const {token} = req.body;
    try{
        const user = jwt.verify(token,jwtSecretKey);
        const username = user.Username;
        newSignIn.findOne({Username:username}).then((data) =>{
            res.send({status:"ok",data: data});
        }).catch((error)=>{
            res.send({status: "error",data : error});
        });
    }
    catch (error){

    }
})

app.get("/html/Faculty", function (req, res) {
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

app.get("/Faculty", function (req, res) {
    try {
        run();
        async function run() {
            const user = await newFaculty.find({});
            // console.log(user);
            res.render("../public/html/Faculty", { user: user });
        }
    } catch (e) {
        console.log(e);
    }
});

app.get("/html/Publication", function (req, res) {
    try {
        run();
        async function run() {
            const publications = await publication.find({});
            res.render("../public/html/Publication", { publications: publications });
        }
    } catch (e) {
        console.log(e);
    }
});

app.get("/Publication",function(req,res){
        try {
            run();
            async function run() {
                const publications = await publication.find({});
                // console.log(publications);
                res.render("../public/html/Publication", { publications: publications });
            }
        } catch (e) {
            console.log(e);
        }

})
app.get("/html/Projects",function(req,res){
    try {
        run();
        async function run() {
            const projects = await project.find({});
            // console.log(publications);
            res.render("../public/html/Projects", { projects: projects });
        }
    } catch (e) {
        console.log(e);
    }

})
app.get("/Projects",function(req,res){
    try {
        run();
        async function run() {
            const projects = await project.find({});
            // console.log(publications);
            res.render("../public/html/Projects", { projects: projects });
        }
    } catch (e) {
        console.log(e);
    }

})

app.get("/user_profile",(req,res)=>{
    res.render("../public/html/user_profile");
})
app.get("/", function (req, res) {
    res.set({
        "Access-control-Allow-Origin": "*",
    });
    // return res.redirect('html/index.html');
    res.sendFile(__dirname + "/public/html/index.html");
}).listen(5000);
console.log("server listening at port 5000");

