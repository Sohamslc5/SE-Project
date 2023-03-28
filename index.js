var express = require("express");
var bodyParse = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(bodyParse.json());
app.use(express.static('public'));
app.use(bodyParse.urlencoded({
    extended : true
}))

mongoose.connect('mongodb://127.0.0.1:27017/serl');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})

app.post('/sign_up', (req,res)=>{
    var username = req.body.username;
    var email =req.body.email;
    var pass = req.body.password;
    console.log(username);
    var data = {
        "username": username,
        "email":email,
        "password":pass,
    }
db.collection('details').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
              
    });
          
    // return res.redirect('html/index.html');
    res.sendFile(__dirname+ '/public/html/index.html');
})

app.post('/login',(req,res)=>{
    try{
        var username = req.body.username;
        var pass = req.body.password;

        db.collection('details').findOne({username:username},(err,re)=>{
            if(re==null){
                res.send("Information do not match.. Make account first");
            }
            else if(err) throw err;

            if(re.password==pass){
                console.log("Login Successful");
                // return res.redirect('html/index.html');
                res.sendFile(__dirname+ '/public/html/index.html');
            }
            else {
                console.log("password not match");
                res.send("Password do not match");
            }
        })        
    }
    catch(error){
        console.log("Invalid Information");
    }
})

app.get('/',function(req,res){
    res.set({
        'Access-control-Allow-Origin': '*'
        });
    // return res.redirect('html/index.html');
    res.sendFile(__dirname+ '/public/html/index.html');
    }).listen(3000)
      
      
    console.log("server listening at port 3000");