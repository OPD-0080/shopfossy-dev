
// IMPORTATION 
import { getAuth,  onAuthStateChanged, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
// ...
// VARIABLES
const userImages = document.querySelectorAll(".image-user");
const userNameEl = document.querySelector(".user-name");
const userEmailEl = document.querySelector(".user-email");
const alertVerification = document.querySelector(".verification-alert-wrap");
const verifyBtn = alertVerification.querySelector(".verify-btn");
const verifyText = alertVerification.querySelector(".v-text");
const userBtnWrapper = document.querySelector(".user-btns");
const btnOff = userBtnWrapper.querySelector(".off");
const btnOn = userBtnWrapper.querySelector(".in");
const imageText = document.querySelector(".image-text");
// ...

function onAuthState() {
  const auth = getAuth();
  // auth user in session state,
  // will be close and when windows tab is closed
  // ...
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
          // ...

          // Displaying user in DOM
          output(user, userName, userEmail, userPhoto);
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
            verifyText.innerHTML = "Send link for Email Verification !"
            setTimeout(() => { 
              alertVerification.classList.remove("collapse");
            }, 2000);
            // ...
            // Passing user through the function for email verification
            emailVerificationLink(user);
            // ...
          }
          // ...
          
          // activating buttons 
          btnOff.classList.add("show");
          btnOn.classList.add("show");
          // ...

      } else {
        btnOff.classList.remove("show");
        btnOn.classList.remove("show");
      }
  });
  // display data on dashboard
  function output(user, userName, userEmail, userPhoto) {
    // get userName from local storage
    const userObj = JSON.parse(localStorage.getItem("currentUserCred"));
    const user_name = userObj.userName;
    const Email = userObj.email;

    // getting first letter of the string 
    var firstLetter = userObj.userName.charAt(0).toUpperCase();
    imageText.style.backgroundImage = `none`;
    imageText.innerHTML = `${firstLetter}`;
        // ...
    // ...
    if (user.photoURL == null) {
      userImages.forEach(userImage => {
          userImage.style.backgroundImage = "none";
          userImage.innerHTML = `${firstLetter}`;
      });
      //userNameEl.innerHTML = user.displayName;
    }if (user.displayName == null) {
        userNameEl.innerHTML = `${user_name}`;
    }
    if (user.photoURL == null && user.displayName) {
        userImages.forEach(userImage => {
            userImage.style.backgroundImage = "none";
            userImage.innerHTML = `${firstLetter}`;
        });
        userNameEl.innerHTML = user.displayName;
    }
    if (user.photoURL && user.displayName) {
        userImages.forEach(userImage => {
            userImage.style.backgroundImage = `url(${user.photoURL})`;
            userImage.style.fontSize = "2px";
        });
        userNameEl.innerHTML = user.displayName;
        userEmailEl.innerHTML = user.email;
    }
    userEmailEl.innerHTML = userEmail;
  } 
}
function emailVerificationLink(user) {

  const emailVerifyWrap = document.querySelector(".verification-alert-wrap")
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
export { onAuthState }