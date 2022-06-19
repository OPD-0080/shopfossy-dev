import { getAuth,  onAuthStateChanged, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { signOutFunc } from './firebase-signOut.js';

// VARIABLES
const userImages = document.querySelectorAll(".image-user");
const userNameEl = document.querySelector(".user-name");
const userEmailEl = document.querySelector(".user-email");
const dashBoardBtns = document.querySelectorAll(".dash-btn");
const alertVerification = document.querySelector(".verification-alert-wrap");
const verifyBtn = alertVerification.querySelector(".verify-btn");
const verifyText = alertVerification.querySelector(".v-text");
const imageText = document.querySelector(".image-text");
var formOverlay = document.querySelector(".sign-in-overlay");
// ...
const auth = getAuth();
// USER AUTHENTICATION 
function onAuthState() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            console.log(user);

            // getting user info
            // Destructuring user info
            const userName = user.displayName;
            const userEmail = user.email;
            const userPhoto = user.photoURL;

            // Displaying user in DOM
            output(userName, userEmail, userPhoto);
            // ...

            // checking for email verification
            if (user.isEmailVerified) {
              // notify user a message;
              alertVerification.classList.add("color");
              verifyBtn.classList.add("active");
              verifyText.innerHTML = "Email Verification Successfully !"
              setTimeout(() => { 
                alertVerification.classList.remove("collapse");
              }, 3000);
              // ...
            }else {
                // notify user a message;
              alertVerification.classList.remove("color");
              verifyBtn.classList.remove("active");
              verifyText.innerHTML = "Send link to verify email !"
              setTimeout(() => { 
                alertVerification.classList.add("collapse");
              }, 2000);
              // ...
              // Passing user through the function for email verification
              emailVerificationLink(user);
              // ...
            }
            // ...
        } else {
          // User is signed out
            window.location.assign("../../index.html");
          // ...
        }
    });
    function output(userName, userEmail, userPhoto) {
      if (userName == null || userName == undefined || userName == "") {
        const userObj = localStorage.getItem("currentUserCred");
        userNameEl.innerHTML = userObj.userName;
      }else {
        userNameEl.innerHTML = userName;
      };
      if (userPhoto == null || userPhoto == undefined || userPhoto == "") {
        const firstLetter = userName.charAt(0).toUpperCase();
        imageText.innerHTML = `${firstLetter}`;
        userImages.forEach(userImage => {
          userImage.style.backgroundImage = `none`;
        });
      }else {
        userImages.forEach(userImage => {
          userImage.style.backgroundImage = `url(${userPhoto})`;
        })
      }
      userEmailEl.innerHTML = userEmail;
    }
}onAuthState();
// ...
// SIGN OUT 
(function(){
  dashBoardBtns.forEach(btn => {
      btn.onclick = (e) => {
          if (e.target.classList.contains("sign-out-btn") || e.target.classList.contains("it-s") || e.target.classList.contains("i-out")) {
              signOutFunc();
          }
      }
  })
})();
// ...
// SEND EMAIL VERIFICATION
function emailVerificationLink(user) {

  const emailVerifyWrap= document.querySelector(".verification-alert-wrap")
  const btn = emailVerifyWrap.querySelector(".verify-btn");
  btn.onclick = () => {
    
    sendEmailVerification(user)
    .then(() => {
      // notify user a message;
      alertVerification.classList.add("color");
      verifyBtn.classList.add("active");
      verifyText.innerHTML = "Email Verification Sent. Await for Confirmation";
      // ...
    })
    .catch((error) => {
      const errorMessage = error.message;
      const errorCode = error.code;
      console.log(errorCode);
    })
  }
}
// ...
