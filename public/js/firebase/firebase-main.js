// IMPORTATION SECTION START
import { signIn } from './firebase_signIn.js';
import { logIn } from './firebase_logIn.js';
import { authProvider_goggle, authProvider_facebook, authProvider_apple } from './firebaseProvider.js';
import { onAuthState } from './firebase-onAuthState.js';
import { signOutFunc, deleteAccount } from './firebase-signOut.js';

// IMPORTATION SECTION END

// VARIABLES START
const signInForm = document.querySelector(".signIn-container");
const logInForm = document.querySelector(".logIn-container");
const firstNameEl = document.querySelector(".first-name");
const lastNameEl = document.querySelector(".last-name");
const s_email = document.querySelector(".s-email");
const l_email = document.querySelector(".l-email");
const s_password = document.querySelector(".password");
const s_confirm_password = document.querySelector(".s-pass");
const l_confirm_password = document.querySelector(".l-pass");
const alertError = document.querySelector(".error-message");
const altBtns = document.querySelectorAll(".alt-btn");
const dashBoardBtns = document.querySelectorAll(".dash-btn");
var message = "";
// VARIABLES END

// SIGN-IN SECTION START
(function(){

    signInForm.addEventListener("submit", (e) => {
        e.preventDefault();

        var firstName = firstNameEl.value; 
        var lastName = lastNameEl.value; 
        var email = s_email.value; 
        var confirmPassword = s_confirm_password.value; 
        var userPassword = s_password.value;
        var password;

        if (userPassword !== confirmPassword) {
            // alert the user 
            console.log("Password does not match");
            message = "Password does not match";
            alertError.innerHTML = message;
        }else {
            password = confirmPassword;
            authSignIn(firstName, lastName, email, userPassword, password);
        }
    })


    function authSignIn(firstName, lastName, email, userPassword, password) {
        signIn(firstName, lastName, email, userPassword, password)
        console.log(firstName, lastName, email, userPassword, password);
    }
})();
// SIGN-IN SECTION END

// LOG-IN SECTION START
(function(){

    logInForm.addEventListener("submit", (e) => {
        e.preventDefault();

        var email = l_email.value;
        var password = l_confirm_password.value;

        logIn(email, password);
    })

})();
// LOG-IN SECTION END

// AUTH PROVIDER SECTION START
(function(){

    altBtns.forEach(btn => {
        btn.onclick = (e) => {
            if (e.target.classList.contains("goggle-btn")) {
                authProvider_goggle();
            }else if (e.target.classList.contains("facebook-btn")) {
                authProvider_facebook();
            }else if (e.target.classList.contains("apple-btn")) {
                authProvider_apple();
            }
        }
    })

})();
// AUTH PROVIDER SECTION END

//  CHECKING USER AUTHENTICATION START
(function(){
    onAuthState()
})();
//  CHECKING USER AUTHENTICATION END

(function(){
    dashBoardBtns.forEach(btn => {
        btn.onclick = (e) => {
            if (e.target.classList.contains("sign-out-btn") || e.target.classList.contains("i-out")) {
                signOutFunc();

            }else if (e.target.classList.contains("delete-btn") || e.target.classList.contains("i-deleted")) {
                deleteAccount();
            }
        }
    })
})();