const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const login_btn = document.querySelector("#login-btn");


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