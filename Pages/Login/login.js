const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

document.addEventListener("DOMContentLoaded", function() {
  var loginBtn = document.getElementById("submit-btn");

  loginBtn.addEventListener("click", function(event) {
      event.preventDefault();
      
      var emailInput = document.getElementById("login-email").value;
      var passwordInput = document.getElementById("login-passwd").value;

      if (emailInput.includes("dedsec8080@gmail.com") && passwordInput.includes("toad")) {
          window.location.href = "D:/--PROJECTS2024--/LumosAI_/homepage.html";
      } else {
          alert("Incorrect credentials");
      }
  });
});

/*FIREBASE AUTH*/

