
import { getAuth, createUserWithEmailAndPassword, signOut, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

var alertError = document.querySelector(".error-message");
var alertWrap = document.querySelector(".error-alert-wrap");
const inputEls = document.querySelectorAll(".input-tags");
const logInContent = document.querySelector(".logIn-content");
const signInContent = document.querySelector(".signIn-content");
const headerText = document.querySelector(".signIn-header");
const headerImage = document.querySelector(".image-text");

const auth = getAuth();

function signIn(userName, email, password) {

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
      // Signed in 
        const user = userCredential.user;
        console.log(user);

        notification(userName)
      // ...
  })
  .then(() => {
    // prevent  firebase default login 
    signOut(auth)
  })
  .catch((error) => {
      const errorMessage = error.message;
      const errorCode = error.code;
      if (errorCode == "auth/email-already-in-use") {
        alertError.innerHTML = "Email Already Exist !";
        alertWrap.classList.add("show");
        alertWrap.style.background = "red";
        setTimeout(() => { 
            alertWrap.classList.remove("show");
        }, 3000)
      }else if (errorCode == "auth/operation-not-allowed") {
        alertError.innerHTML = "Internet Status: BAD. TRY AGAIN";
        alertWrap.classList.add("show");
        alertWrap.style.background = "red";
        setTimeout(() => { 
            alertWrap.classList.remove("show");
        }, 3000)
      }else if (errorCode == "auth/weak-password") {
        alertError.innerHTML = "Password VERY WEAK";
        alertWrap.classList.add("show");
        alertWrap.style.background = "red";
        setTimeout(() => { 
            alertWrap.classList.remove("show");
        }, 3000)
      }else if (errorCode == "auth/network-request-failed") {
        alertError.innerHTML = "Bad Internet Connection. Try Again !";
        alertWrap.classList.add("show");
        alertWrap.style.background = "red";
        setTimeout(() => { 
            alertWrap.classList.remove("show");
        }, 3000)
      }

      console.log(errorCode);
    // ..
  });
}

async function notification(userName) {

  try {
    // user alert
    alertError.innerHTML = "PROCESSING ...";
    alertWrap.style.background = "grey";
    alertWrap.classList.add("show");
    headerText.style.display = "none";
    headerImage.classList.remove("change");

    // saving user name in local storage
    localStorage.setItem("username", userName);

    // Alert message and display off DOM
    setTimeout(() => {
      inputEls.forEach(el => {el.value = ""})
      alertError.innerHTML = "USER successfully created";
      alertWrap.style.background = "green";
      alertWrap.classList.add("show");
    }, 1000)
    setTimeout(() => { 
      alertWrap.classList.remove("show");
    }, 3000);
    // ...
    setTimeout(() => { 
      // return to login page
      logInContent.classList.remove("show");
      signInContent.classList.remove("collapse");
      // ...
      // alert user
      headerText.style.display = "block";
      headerText.innerHTML = "LogIn";
      alertError.innerHTML = "LogIn With your Credentials";
      alertWrap.style.background = "grey";
      alertWrap.classList.add("show");
      // ...
    }, 3500);

  } catch (e) {
    // show error in DOM
    alertError.innerHTML = "Internet Connection Bad, Try Again !";
    alertWrap.style.background = "red";
    alertWrap.classList.add("show");
  }
}

export { signIn }