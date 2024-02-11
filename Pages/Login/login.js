import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

/*FIREBASE AUTH*/

const firebaseConfig = {
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginbutton = document.getElementById("submit-btn");
const signupbutton = document.getElementById("submit-btn-su");
const signupname = document.getElementById("signup-name");
const signuppassword = document.getElementById("signup-passwd");
const signupemail = document.getElementById("signup-email");
const loginemail = document.getElementById("login-email");
const loginpassword = document.getElementById("login-passwd")

/*SIGNUP*/

signupbutton.addEventListener('click', function(){
  event.preventDefault();
  var isVerified = true;
  var mail = signupemail.value;
  var pass = signuppassword.value;

  if(isVerified) {
    createUserWithEmailAndPassword(auth, mail, pass)
      .then((userCredential) => {
      const user = userCredential.user;
      window.alert("Account created.");
      console.log("Account created")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      window.alert("Not a valid email id");
      console.log(errorMessage);
    });
  }
});

/*LOGIN*/

loginbutton.addEventListener('click', function(){
  event.preventDefault();
  var mail1 = loginemail.value;
  var pass2 = loginpassword.value;
  signInWithEmailAndPassword(auth, mail1, pass2)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Signed in");
      window.location.href = "D:/--PROJECTS2024--/LumosAI_/homepage.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      window.alert("Invalid Credentials");
      console.log(errorMessage)
    });
});

/*Animation*/

const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});