const $login_parent = document.querySelector('#login-parent');

if (window.localStorage.getItem("token") === null) {
    
}
else {
  $login_parent.innerHTML = '';
  const pphtml = `
  <a href="javascript:loggout()" class="btn bg-gradient-dark mb-0">
  Logout
</a>
<a href="/user_profile" class="btn bg-gradient-light mb-0">
   My Profile
</a>
  `;

  $login_parent.innerHTML = pphtml;
}

function loggout(){
    window.localStorage.removeItem("token");
    window.location.href = "/";
}
const $admin_pub = document.querySelector('#admin-publication');
const $admin_rese = document.querySelector('#admin-research');
const $admin_pro = document.querySelector('#admin-project');
const $admin_fac = document.querySelector('#admin-faculty');
if (window.localStorage.getItem("token") !== null){
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
    if(data.data.isAdmin === "true"){
    if($admin_pub!==null){
      $admin_pub.innerHTML = '';
      const lolhtml = `
      <a href="../html/addPublication.html" class="btn bg-gradient-dark mb-0">
                  Add Publication
              </a>
      `;
      $admin_pub.innerHTML = lolhtml;
    }
    if($admin_rese!==null){
      $admin_rese.innerHTML = '';
      const lolhtml = `
    <a href="../html/addResearcher.html" class="btn bg-gradient-dark mb-0">
                Add Researcher
            </a>
    `;
      $admin_rese.innerHTML = lolhtml;
    }
    if($admin_pro!==null){
      $admin_pro.innerHTML = '';
      const lolhtml = `
      <a href="../html/addProject.html" class="btn bg-gradient-dark mb-0">
      Add Project
 </a>
    `;
      $admin_pro.innerHTML = lolhtml;
    }
    if($admin_fac!==null){
      $admin_fac.innerHTML = '';
      const lolhtml = `
      <a href="../html/addFaculty.html" class="btn bg-gradient-dark mb-0">
      Add Faculty
 </a>
    `;
      $admin_fac.innerHTML = lolhtml;
    }
  }
  if(data.data.isFaculty === "true"){
    if($admin_pub!==null){
      $admin_pub.innerHTML = '';
      const lolhtml = `
      <a href="../html/addPublication.html" class="btn bg-gradient-dark mb-0">
                  Add Publication
              </a>
      `;
      $admin_pub.innerHTML = lolhtml;
    }
    if($admin_rese!==null){
      $admin_rese.innerHTML = '';
      const lolhtml = `
    <a href="../html/addResearcher.html" class="btn bg-gradient-dark mb-0">
                Add Researcher
            </a>
    `;
      $admin_rese.innerHTML = lolhtml;
    }
    if($admin_pro!==null){
      $admin_pro.innerHTML = '';
      const lolhtml = `
      <a href="../html/addProject.html" class="btn bg-gradient-dark mb-0">
      Add Project
 </a>
    `;
      $admin_pro.innerHTML = lolhtml;
    }
  }
});
}