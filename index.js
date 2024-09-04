var express = require("express");
var bodyParse = require("body-parser");
var mongoose = require("mongoose");
const app = express();
const nodemailer = require("nodemailer");
const newPublication = require("./public/js/publication");
const newFaculty = require("./public/js/faculty_schema");
const newSignIn = require("./public/js/SignInloginDetails");
const newResearcher = require("./public/js/researcher_schema");
const ejs = require("ejs");
const project = require("./public/js/project_schema");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { log } = require("console");
const { updateOne } = require("./public/js/researcher_schema");
const publication = require("./public/js/publication");
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
// const url = `mongodb+srv://akshat8:qc1QqUQWCg6caAxZ@cluster0.6ggnksx.mongodb.net/?retryWrites=true&w=majority`;
const url = 'mongodb+srv://sohamslc5:Soham%402989@se-project.o2h3pf3.mongodb.net/?retryWrites=true&w=majority';
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
        var Mentor = req.body.Mentor;
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
var curr_okay = null;
app.post("/userdata", async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, jwtSecretKey);
        const username = user.Username;
        curr_okay = username;
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
app.post("/editResearcher", (req, res) => {
    try {
        run();
        async function run(){
            var enrolMent = req.body.enrol;
            var curr_Researcher = await newResearcher.findOne({researcher_roll_Num: enrolMent});
            if(curr_Researcher){
                res.render("../public/html/editResearcherForm", {Researcher: curr_Researcher});
            }else{
                res.send("Researcher not found");
            }
        }
    } catch (error) {
        console.log(error);
    }
})

app.post("/editPublication", (req, res) => {
    try {
        run();
        async function run(){
            var author = req.body.enrol;
            var title = req.body.title;
            // var id = req.body.publication_id;
            var curr_publication = await newPublication.findOne({enrol_num: author, title: title});
            // console.log(curr_publication);
            res.render("../public/html/editPublicationForm", {publication: curr_publication});
        }
    } catch (error) {
        console.log(error);
    }
})

app.post("/editProject", (req, res) => {
    try {
        run();
        async function run(){
            var title = req.body.title;
            var enrol = req.body.enrol;
            // var isDelete = await project.deleteOne({});
            var curr_project = await project.findOne({title: title, enrol_num: enrol});
            res.render("../public/html/editProjectForm", {project: curr_project});
        }
    } catch (error) {
        console.log(error);
    }
})

app.post("/editFaculty",(req,res)=>{
    try {
        run();
        async function run(){ 
            var title = req.body.name;
            var cmail = req.body.cmail;
            var fac = await newFaculty.findOne({name: title, College_email: cmail});
            res.render("../public/html/editFacultyForm", {fac: fac});
        }
    } catch (e) {
        console.log(e);
    }
})

app.post("/updateFaculty", (req, res)=>{
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
        const update = {
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
        };
        run();
        async function run() {
            var hehe = await newFaculty.updateOne({name: name, College_email: email}, update);
            res.redirect('/Faculty');
        }
    } catch (e) {
        console.log(e);
    } 
});

app.post("/updateResearcher", (req, res) => {
    try {
        var name = req.body.name;
        var c_mail = req.body.email;
        var p_mail = req.body.anotheremail;
        var Mentor = req.body.Mentor;
        var p_num = req.body.phone;
        var bio = req.body.bio;
        var cur_res = req.body.curr_Research;
        var res_pfp = req.body.pfp;
        var roll = req.body.RollNumber;
        const update = {
            researcher_Name: name,
            researcher_CollegeMail: c_mail,
            researcher_PersonalMail: p_mail,
            researcher_Bio: bio,
            researcher_Curr_Research: cur_res,
            researcher_Mentor_Name: Mentor,
            researcher_Profile_Pic: res_pfp,
            researcher_Mobile_Number: p_num
        };
        run();
        async function run() {
            var hehe = await newResearcher.updateOne({researcher_roll_Num: roll}, update);
            res.redirect('/Researchers');
        }
    } catch (e) {
        console.error(e);
    }
})

app.post("/updatePublication", (req, res) => {
    try {
        var title = req.body.title;
        var desc = req.body.desc;
        var link = req.body.links;
        var author = req.body.peoplename;
        var authLink = req.body.peoplelink;
        var mentor_name = req.body.mentor;
        var enrol = req.body.enrol;
        // console.log(desc);

        const update = {
            desc: desc,
            link: link,
            authLink: authLink,
            mentor_name: mentor_name,
            author: author,
            // enrol_num: enrol,
        };
        run();
        async function run() {
            var hehe = await newPublication.updateOne({title: title, enrol_num: enrol}, update);
            res.redirect('/Publication');
        }
    } catch (e) {
        console.error(e);
    }
})

app.post("/updateProject", (req, res) => {
    try {
        var id = req.body.project_id;
        var title = req.body.title;
        var desc = req.body.desc;
        var degree = req.body.degree;
        var date = req.body.datepicker;
        var link = req.body.links;
        var enrol = req.body.enrol;
        var author = req.body.peoplename;
        var authLink = req.body.peoplelink;

        const update = {               
                desc : desc,
                degree : degree,
                date : date,
                link : link,
                author : author,
                authLink : authLink,
        };
        run();
        async function run() {
            var hehe = await project.updateOne({title: title, enrol_num: enrol}, update);
            res.redirect('/Projects');
        }
    } catch (e) {
        console.error(e);
    }
})
app.post("/deleteResearcher",(req,res)=>{
    try {
        run();
        async function run(){ 
            var enrolment_number = req.body.enrol;
            console.log(enrolment_number);
            var isDelete = await newResearcher.deleteOne({researcher_roll_Num: enrolment_number});
            res.redirect('/Researchers');
        }
    } catch (e) {
        console.log(e);
    }
})
app.post("/deletePublication",(req,res)=>{
    try {
        run();
        async function run(){ 
            var author = req.body.enrol;
            var title = req.body.title;
            console.log('Deleted publication ' + author + title);
            var isDelete = await newPublication.deleteOne({enrol_num: author, title: title});
            res.redirect('/Publication');
        }
    } catch (e) {
        console.log(e);
    }
})

app.post("/deleteProject",(req,res)=>{
    try {
        run();
        async function run(){ 
            var title = req.body.title;
            var enrol = req.body.enrol;
            var isDelete = await project.deleteOne({title: title, enrol_num: enrol});
            res.redirect('/Projects');
        }
    } catch (e) {
        console.log(e);
    }
})
app.post("/deleteFaculty",(req,res)=>{
    try {
        run();
        async function run(){ 
            var title = req.body.name;
            var cmail = req.body.cmail;
            var isDelete = await newFaculty.deleteOne({name: title, College_email: cmail});
            res.redirect('/Faculty');
        }
    } catch (e) {
        console.log(e);
    }
})
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
    if(curr_okay === null){
        res.render("../public/html/user_profile");
    }else{
        run();
        async function run(){
            const ifResearcher = await newResearcher.find({researcher_Name: curr_okay});
            var validation;
            if(ifResearcher.length === 0){
                if(curr_okay === "admin"){
                    validation = 2; //is admin
                    const okay = {validation};
                    res.render("../public/html/user_profile", {Okay: okay});
                }else{
                    validation  = 3; //is faculty
                    const hehe = await newFaculty.findOne({name: curr_okay});
                    const okay = {validation, hehe};
                    res.render("../public/html/user_profile", {Okay: okay});
                }
            }else{
                validation = 1; //is researcher
                const PUB = await publication.find({author: curr_okay});
                const okay = {validation, PUB};
                res.render("../public/html/user_profile", {Okay: okay});
            }
        }
    }
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
app.get("/forget-pass",(req,res)=>{
    res.sendFile(__dirname+ "/public/html/reset.html");
})
app.post('/reset', async (req, res) => {
    try{
        const user = await newSignIn.findOne({Email : req.body.email})
        if(user){
            const hash = user.Password
            const resetLink = `http://localhost:5000/reset?email=${user.Email}&hash=${hash}`
            // return res.status(200).json({
            //     resetLink
            // })
            //remember to send a mail to the user
            let mailTransporter = nodemailer.createTransport({
                // service: 'gmail',
                // type: "SMTP",
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                // host: "sandbox.smtp.mailtrap.io",
                // port: 2525,
                auth: {
                    user: 'Radhikaap948@gmail.com',
                    pass: 'ihnsqofktnxkdubu'
                }
            });
             
            let mailDetails = {
                from: 'Radhikaap948@gmail.com',
                to: user.Email,
                subject: 'Reset Password SERL LAB',
                // text: 'Node.js testing mail for GeeksforGeeks'
                html: '<p>Click <a href="' + resetLink + '">here</a> to reset your password</p>'
            };
            mailTransporter.sendMail(mailDetails, function(err, data) {
                if(err) {
                    console.log('Error Occurs');
                    console.log(err);
                } else {
                    console.log('Email sent successfully');
                    res.redirect('/Login');
                    alert('Mail sent')
                }
            });
        }else{
            return res.status(400).json({
                message : "Email Address is invalid"
            })
        } 
    }catch(err){
        console.log(err)
        return res.status(500).json({
            message : "Internal server error"
        })
    }
})

app.get('/reset', async (req, res) => {
    try {
        if (req.query && req.query.email && req.query.hash) {
            // console.log(req.query.email);
            const user = await newSignIn.findOne({ Email: req.query.email })
            // console.log(user);
            if (user) {
                // const valid = await bcrypt.compare(req.query.hash,user.Password);
                if (req.query.hash===user.Password) {
                    // req.session.email = req.query.email;
                    //issue a password reset form
                    return res.sendFile(__dirname + '/public/html/new_pass.html')
                } else {
                    return res.status(400).json({
                        message: "You have provided an invalid reset link"
                    })
                }
            } else {
                return res.status(400).json({
                    message: "You have provided an invalid reset link"
                })
            }
        } else {
            return res.render('/forget-pass');
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
})

app.post('/reset-pass', async (req,res)=>{
    try {
        var email = req.body.email;
        var pass = req.body.pass;
        run();
        async function run() {
            const hash = await bcrypt.hash(pass,saltRounds);
            await newSignIn.updateOne(
                { Email: email },
                { $set: { Password: hash } },
                { new: true }
              );
        }
        if (res.status(201)) {
            // alert('Password reset done')
            return res.redirect('/Login');
        } else {
            
        }
    } catch (e) {
        console.log(e);
    }
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
