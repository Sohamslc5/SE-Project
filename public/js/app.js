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

const checkbox = document.querySelector("input[name=admin]");

const $admin_check = document.querySelector("#admin-check");
checkbox.addEventListener('change', function() {
    if (this.checked) {
        const lolhtml = `
        <div class="input-field">
              <i class="fas fa-lock"></i>
              <input type="password" placeholder="Admin Key" id="admin-key" name="admin-key" required/>
            </div>`
        $admin_check.innerHTML = lolhtml;
    } else {
    //   console.log("Checkbox is not checked..");
        $admin_check.innerHTML = '';
    }
});
var admin_secret_key = "ma_hu_admin";
signup_btn.addEventListener('click',(e)=>{
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let email = document.getElementById('email').value;
    let fullname = document.getElementById('fullname').value;
    let enrolment = document.getElementById('enrolment').value;
    let mobileno = document.getElementById('mobileno').value;
    let isAdmin = "false";
    if(username ==="" || password ==="" || email ==="" || fullname ==="" || enrolment ==="" || mobileno ==="" ){
        alert("Please fill all fields");
        return;
    }
    if(checkbox.checked===true){
        let admin_key = document.getElementById("admin-key").value;
        if(admin_secret_key===admin_key){
            isAdmin = "true";
        }
        else {
            alert("Invalid Admin Key");
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
    }),
})
    .then((res)=> res.json())
    .then((data)=>{
        console.log(data);
        if(data.status=="ok"){
            // alert("login successful");
            // window.localStorage.setItem("isAdmin",data.data);
            window.location.href="/Login";
        }
    });
})

