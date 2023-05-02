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