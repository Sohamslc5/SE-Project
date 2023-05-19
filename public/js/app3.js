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
// const $modifydel_btn_researcher = document.querySelector('#modifydel-btn-researcher');
// const $modifydel_btn_projects = document.querySelector('#modifydel-btn-projects');
// const $modifydel_btn_publication = document.querySelector('#modifydel-btn-publication');
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
              <a href="" class="btn bg-gradient-dark mb-0">
                  Modify Publication
              </a>
              <a href="" class="btn bg-gradient-dark mb-0">
                  Delete Publication
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
            <a href="" class="btn bg-gradient-dark mb-0">
                  Modify Researcher
              </a>
              <a href="" class="btn bg-gradient-dark mb-0">
                  Delete Researcher
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
 <a href="" class="btn bg-gradient-dark mb-0">
                  Modify Project
              </a>
              <a href="" class="btn bg-gradient-dark mb-0">
                  Delete Project
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
 <a href="" class="btn bg-gradient-dark mb-0">
                  Modify Faculty
              </a>
              <a href="" class="btn bg-gradient-dark mb-0">
                  Delete Faculty
              </a>
    `;
      $admin_fac.innerHTML = lolhtml;
    }
    // if($modifydel_btn_researcher!==null){
    //   $modifydel_btn_researcher.innerHTML = '';
    //   const lolhtml = `
    //   <div class="row">
    //                                 <form action="/editResearcher" method="post">
    //                                     <button class="btn-sm" id="editResearcher" type="submit" style="background-color: green; width: 40px; border-radius: 4px;border-color: aliceblue;" data-toggle="tooltip" data-placement="top" title="Edit" name="name" value="<%= researcher_data[i].researcher_roll_Num %>">
    //                                         <i class="fa fa-edit" style="color: white; margin-left: 0px; padding-right: 40px;"></i></button>
    //                                 </form>
    //                             </div>
    //                             <div class="row">
    //                                 <form action="/deleteResearcher" method="post">
    //                                     <button class="btn-sm" id="deleteResearcher" type="submit" style="width: 40px; border-radius: 4px; border-color: aliceblue; background-color: red;"  name="name" value="<%= researcher_data[i].researcher_roll_Num %>" >
    //                                         <i class="fa fa-trash" style="color: white; margin-left: 0px; padding-right: 40px;"></i></button></button>
    //                                 </form>
    //                             </div>`
      
    //   $modifydel_btn_researcher.innerHTML = lolhtml;
    // }
    // if($modifydel_btn_projects!==null){
    //   $modifydel_btn_projects.innerHTML = '';
    //   const lolhtml = `
    //   <span style="float:right;">
    //                                 <form action="/deleteProject" method="post">
    //                                 <button class="btn-sm" id="deleteProject" type="submit" style="width: 40px; border-radius: 4px; border-color: aliceblue; background-color: red;"  name="project_id" value="<%= projects[i]._id %>" >
    //                                     <i class="fa fa-trash" style="color: white; margin-left: 0px; padding-right: 40px;"></i></button></button>
    //                                 </form>
    //                             </span>
    //                             <span style="float:right;">
    //                                 <form action = "/editProject" method="post">
    //                                 <button class="btn-sm" id="editPublication" type="submit" style="background-color: green; width: 40px; border-radius: 4px;border-color: aliceblue;" data-toggle="tooltip" data-placement="top" title="Edit" name="project_id" value="<%= projects[i]._id%>">
    //                                     <i class="fa fa-edit" style="color: white; margin-left: 0px; padding-right: 40px;"></i></button>
    //                                     </form>
    //                             </span>`
      
    //   $modifydel_btn_projects.innerHTML = lolhtml;
    // }
    // if($modifydel_btn_publication!==null){
    //   $modifydel_btn_publication.innerHTML = '';
    //   const lolhtml = `
    //   <span style="float:right;">
    //                         <form action="/deletePublication" method="post">
    //                         <button class="btn-sm" id="deletePublication" type="submit" style="width: 40px; border-radius: 4px; border-color: aliceblue; background-color: red;"  name="publication_id" value="<%= Publication_data[i]._id %>" >
    //                             <i class="fa fa-trash" style="color: white; margin-left: 0px; padding-right: 40px;"></i></button></button>
    //                         </form>
    //                     </span>
    //                     <span style="float:right;">
    //                         <form action = "/editPublication" method="post">
    //                         <button class="btn-sm" id="editPublication" type="submit" style="background-color: green; width: 40px; border-radius: 4px;border-color: aliceblue;" data-toggle="tooltip" data-placement="top" title="Edit" name="publication_id" value="<%= Publication_data[i]._id%>">
    //                             <i class="fa fa-edit" style="color: white; margin-left: 0px; padding-right: 40px;"></i></button>
    //                             </form>
    //                     </span>`
      
    //   $modifydel_btn_publication.innerHTML = lolhtml;
    // }
  }
  if(data.data.isFaculty === "true"){
    if($admin_pub!==null){
      $admin_pub.innerHTML = '';
      const lolhtml = `
      <a href="../html/addPublication.html" class="btn bg-gradient-dark mb-0">
                  Add Publication
              </a>
              <a href="" class="btn bg-gradient-dark mb-0">
                  Modify Publication
              </a>
              <a href="" class="btn bg-gradient-dark mb-0">
                  Delete Publication
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
            <a href="" class="btn bg-gradient-dark mb-0">
                  Modify Researcher
              </a>
              <a href="" class="btn bg-gradient-dark mb-0">
                  Delete Researcher
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
 <a href="" class="btn bg-gradient-dark mb-0">
                  Modify Project
              </a>
              <a href="" class="btn bg-gradient-dark mb-0">
                  Delete Project
              </a>
    `;
      $admin_pro.innerHTML = lolhtml;
    }
    // if($modifydel_btn_researcher!==null){
    //   $modifydel_btn_researcher.innerHTML = '';
    //   const lolhtml = `
    //   <div class="row">
    //                                 <form action="/editResearcher" method="post">
    //                                     <button class="btn-sm" id="editResearcher" type="submit" style="background-color: green; width: 40px; border-radius: 4px;border-color: aliceblue;" data-toggle="tooltip" data-placement="top" title="Edit" name="name" value="<%= researcher_data[i].researcher_roll_Num %>">
    //                                         <i class="fa fa-edit" style="color: white; margin-left: 0px; padding-right: 40px;"></i></button>
    //                                 </form>
    //                             </div>
    //                             <div class="row">
    //                                 <form action="/deleteResearcher" method="post">
    //                                     <button class="btn-sm" id="deleteResearcher" type="submit" style="width: 40px; border-radius: 4px; border-color: aliceblue; background-color: red;"  name="name" value="<%= researcher_data[i].researcher_roll_Num %>" >
    //                                         <i class="fa fa-trash" style="color: white; margin-left: 0px; padding-right: 40px;"></i></button></button>
    //                                 </form>
    //                             </div>`
      
    //   $modifydel_btn_researcher.innerHTML = lolhtml;
    // }
    // if($modifydel_btn_projects!==null){
    //   $modifydel_btn_projects.innerHTML = '';
    //   const lolhtml = `
    //   <span style="float:right;">
    //                                 <form action="/deleteProject" method="post">
    //                                 <button class="btn-sm" id="deleteProject" type="submit" style="width: 40px; border-radius: 4px; border-color: aliceblue; background-color: red;"  name="project_id" value="<%= projects[i]._id %>" >
    //                                     <i class="fa fa-trash" style="color: white; margin-left: 0px; padding-right: 40px;"></i></button></button>
    //                                 </form>
    //                             </span>
    //                             <span style="float:right;">
    //                                 <form action = "/editProject" method="post">
    //                                 <button class="btn-sm" id="editPublication" type="submit" style="background-color: green; width: 40px; border-radius: 4px;border-color: aliceblue;" data-toggle="tooltip" data-placement="top" title="Edit" name="project_id" value="<%= projects[i]._id%>">
    //                                     <i class="fa fa-edit" style="color: white; margin-left: 0px; padding-right: 40px;"></i></button>
    //                                     </form>
    //                             </span>`
      
    //   $modifydel_btn_projects.innerHTML = lolhtml;
    // }
    // if($modifydel_btn_publication!==null){
    //   $modifydel_btn_publication.innerHTML = '';
    //   const lolhtml = `
    //   <span style="float:right;">
    //                         <form action="/deletePublication" method="post">
    //                         <button class="btn-sm" id="deletePublication" type="submit" style="width: 40px; border-radius: 4px; border-color: aliceblue; background-color: red;"  name="publication_id" value="<%= Publication_data[i]._id %>" >
    //                             <i class="fa fa-trash" style="color: white; margin-left: 0px; padding-right: 40px;"></i></button></button>
    //                         </form>
    //                     </span>
    //                     <span style="float:right;">
    //                         <form action = "/editPublication" method="post">
    //                         <button class="btn-sm" id="editPublication" type="submit" style="background-color: green; width: 40px; border-radius: 4px;border-color: aliceblue;" data-toggle="tooltip" data-placement="top" title="Edit" name="publication_id" value="<%= Publication_data[i]._id%>">
    //                             <i class="fa fa-edit" style="color: white; margin-left: 0px; padding-right: 40px;"></i></button>
    //                             </form>
    //                     </span>`
      
    //   $modifydel_btn_publication.innerHTML = lolhtml;
    // }
  }
});
}