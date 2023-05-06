const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const login_btn = document.querySelector("#login-btn");
const signup_btn = document.querySelector("#signup-btn");

sign_up_btn.addEventListener('click', () =>{
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener('click', () =>{
    container.classList.remove("sign-up-mode");
});

login_btn.addEventListener('click',(e)=>{
    e.preventDefault();
    let username = document.getElementById('username2').value;
    let password = document.getElementById('password2').value;
    fetch("http://localhost:5000/login", {
    method: "POST",
    crossDomain: true,
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin" : "*",
    },
    body: JSON.stringify({
        username,
        password,
    }),
})
    .then((res)=> res.json())
    .then((data)=>{
        console.log(data);
        if(data.status=="ok"){
            // alert("login successful");
            window.localStorage.setItem("token",data.data);
            window.location.href="/";
        }
        else {
            alert("Invalid username or password!")
        }
    });
})

const checkbox = document.querySelector("input[name=faculty]");

const $faculty_check = document.querySelector("#faculty-check");
checkbox.addEventListener('change', function() {
    if (this.checked) {
        const lolhtml = `
        <div class="input-field">
              <i class="fas fa-lock"></i>
              <input type="password" placeholder="Faculty Key" id="faculty-key" name="faculty-key" required/>
            </div>`
        $faculty_check.innerHTML = lolhtml;
    } else {
    //   console.log("Checkbox is not checked..");
        $faculty_check.innerHTML = '';
    }
});
var faculty_secret_key = "ma_hu_faculty";
signup_btn.addEventListener('click',(e)=>{
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let email = document.getElementById('email').value;
    let fullname = document.getElementById('fullname').value;
    let enrolment = document.getElementById('enrolment').value;
    let mobileno = document.getElementById('mobileno').value;
    let isAdmin = "false";
    let isFaculty = "false";
    if(username ==="" || password ==="" || email ==="" || fullname ==="" || enrolment ==="" || mobileno ==="" ){
        alert("Please fill all fields");
        return;
    }
    if(checkbox.checked===true){
        let faculty_key = document.getElementById("faculty-key").value;
        if(faculty_secret_key===faculty_key){
            isFaculty = "true";
        }
        else {
            alert("Invalid Faculty Key");
            return;
        }
    }
    fetch("http://localhost:5000/sign_up", {
    method: "POST",
    crossDomain: true,
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin" : "*",
    },
    body: JSON.stringify({
        username,
        password,
        email,
        fullname,
        enrolment,
        mobileno,
        isAdmin,
        isFaculty,
    }),
})
    .then((res)=> res.json())
    .then((data)=>{
        console.log(data);
        if(data.error=="User exist"){
            alert('Username already exist');
        }
        if(data.status=="ok"){
            // alert("login successful");
            // window.localStorage.setItem("isAdmin",data.data);
            window.location.href="/Login";
        }
    });
})

