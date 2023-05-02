const $fullname = document.querySelector('#fullname');
const $email = document.querySelector('#email');
const $username = document.querySelector('#user_name');
const $mobileno = document.querySelector('#mobileno');
const $enrolment = document.querySelector('#enrolment');

fetch("http://localhost:5000/userdata", {
    method: "POST",
    crossDomain: true,
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin" : "*",
    },
    body: JSON.stringify({
        token : window.localStorage.getItem("token"),
    }),
})
.then((res)=> res.json())
.then((data)=>{
    console.log(data);
    $fullname.innerHTML = '';
    $username.innerHTML = '';
    $mobileno.innerHTML = '';
    $enrolment.innerHTML = '';
    $email.innerHTML = '';
    $fullname.innerHTML = data.data.Fullname;
    $email.innerHTML = data.data.Email;
    $enrolment.innerHTML = data.data.Enrollment;
    $mobileno.innerHTML = data.data.MobileNum;
    $username.innerHTML = data.data.Username;
});