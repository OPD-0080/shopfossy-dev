import { getAuth,  onAuthStateChanged/*, setPersistence, browserSessionPersistence*/} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { signOutFunc, deleteAccount } from './firebase-signOut.js';


const userImages = document.querySelectorAll(".image-user");
const userNameEl = document.querySelector(".user-name");
const userEmailEl = document.querySelector(".user-email");
const dashBoardBtns = document.querySelectorAll(".dash-btn");
const alertVerification = document.querySelector(".verification-alert-wrap");
const verifyBtn = alertVerification.querySelector(".verify-btn");
const verifyText = alertVerification.querySelector(".v-text");
var formOverlay = document.querySelector(".sign-in-overlay");

function onAuthState() {
    const auth = getAuth();
    // auth user in session state,
    // will close user even if user forgot to signOut
    /*setPersistence(auth, browserSessionPersistence)
    .then(() => {
      

      // collapsing signLog page form
      window.location.assign("../../index.html");
      formOverlay.classList.add("collapse");
      // ...
      return signInWithEmailAndPassword(auth, email, password);
    });*/
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
              }, 10000);
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
        userImages.forEach(userImage => {
            userImage.style.backgroundImage = `url(${userPhoto})`;
        })
        userNameEl.innerHTML = userName;
        userEmailEl.innerHTML = userEmail;
    }
}onAuthState();

(function(){
  dashBoardBtns.forEach(btn => {
      btn.onclick = (e) => {
          if (e.target.classList.contains("sign-out-btn") || e.target.classList.contains("it-s") || e.target.classList.contains("i-out")) {
              signOutFunc();

          }else if (e.target.classList.contains("delete-btn") || e.target.classList.contains("it-d") || e.target.classList.contains("i-deleted")) {
              deleteAccount();
          }
      }
  })
})();
