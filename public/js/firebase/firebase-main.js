// IMPORTATION SECTION START
import { signIn } from './firebase_signIn.js';
import { logIn} from './firebase_logIn.js';
import { authProvider_goggle, authProvider_facebook, authProvider_apple } from './firebaseProvider.js';
import { onAuthState } from './firebase-onAuthState.js';
import { signOutFunc, deleteAccount } from './firebase-signOut.js';
import { resetPassword } from './firebase-resetPassword.js';

// IMPORTATION SECTION END

// VARIABLES START
const signInForm = document.querySelector(".signIn-container");
const logInForm = document.querySelector(".logIn-container");
const l_confirm_password = document.querySelector(".l-pass");
const alertError = document.querySelector(".error-message");
const altBtns = document.querySelectorAll(".alt-btn");
const dashBoardBtns = document.querySelectorAll(".dash-btn");
var alertWrap = document.querySelector(".error-alert-wrap");
var signInInputs = document.querySelectorAll(".validate-signIn");

var message = "";
// VARIABLES END

// SIGN-IN SECTION START
(function(){
    // Validate Inputs
    var firstNameEL = document.querySelector(".first-name");
    var lastNameEl = document.querySelector(".last-name");
    var emailEl = document.querySelector(".s-email");
    var confirmPasswordEl = document.querySelector(".password");
    var userPasswordEl = document.querySelector(".s-pass");
    var firstName, lastName, email, confirmPassword, userPassword;

    signInInputs.forEach(input => {
        input.onkeyup = (e) => {
            const validateEl = e.target.parentElement;
            if (e.target.classList.contains("first-name")) {
                if (e.target.value.length >= e.target.getAttribute("minlength")) {
                    // change color
                    validateEl.classList.add("green");
                    // ...
                }
                else {
                    // change color
                    validateEl.classList.remove("green");
                }
            }else if (e.target.classList.contains("last-name")) {
                if (e.target.value.length >= e.target.getAttribute("minlength")) {
                    // change color
                    validateEl.classList.add("green");
                    // ...
                }
                else {
                    // change color
                    validateEl.classList.remove("green");
                }
            }else if (e.target.classList.contains("s-email")) {
                var regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if (e.target.value.match(regexp)) {
                    // change color
                    validateEl.classList.add("green");
                     // ...
                }
                else {
                    // change color
                    validateEl.classList.remove("green");
                }
            }else if (e.target.classList.contains("password")) {
                if (e.target.value.length <= e.target.getAttribute("minlength")) {
                    // change color
                    validateEl.classList.remove("green");
                    // ...
                    // Alert user
                    const message = "Password Strength: WEAK";
                    alertError.innerHTML = message;
                    alertWrap.style.background = "red";
                    alertWrap.classList.add("show");
                    // ...
                }else if (e.target.value.length == "5" || e.target.value.length == "6" || e.target.value.length == "7") {
                    // change color
                    validateEl.classList.add("yellow");
                    // ...
                    // Alert user
                    const message = "Password Strength: MEDIUM";
                    alertError.innerHTML = message;
                    alertWrap.style.background = "yellow";
                    alertWrap.classList.add("show");
                    // ...
                }else if (e.target.value.length > "8") {
                    // change color
                    validateEl.classList.add("green");
                    // ...
                    // Alert user
                    const message = "Password Strength: STRONG";
                    alertError.innerHTML = message;
                    alertWrap.style.background = "green";
                    alertWrap.classList.add("show");
                    setTimeout(() => { 
                        alertWrap.classList.remove("show");
                    }, 3000);
                    // ...
                }else {
                    // change color
                    validateEl.classList.remove("green");
                    validateEl.classList.remove("yellow");
                }
            }else if (e.target.classList.contains("s-pass")) {
                if (e.target.value.length <= e.target.getAttribute("minlength")) {
                    // change color
                    validateEl.classList.remove("green");
                    // ...
                    // Alert user
                    const message = "Password Strength: WEAK";
                    alertError.innerHTML = message;
                    alertWrap.style.background = "red";
                    alertWrap.classList.add("show");
                    // ...
                }else if (e.target.value.length == "5" || e.target.value.length == "6" || e.target.value.length == "7") {
                    // change color
                    validateEl.classList.add("yellow");
                    // ...
                    // Alert user
                    const message = "Password Strength: MEDIUM";
                    alertError.innerHTML = message;
                    alertWrap.style.background = "yellow";
                    alertWrap.classList.add("show");
                    // ...
                }else if (e.target.value.length > "8") {
                    // change color
                    validateEl.classList.add("green");
                    // ...
                    // Alert user
                    const message = "Password Strength: STRONG";
                    alertError.innerHTML = message;
                    alertWrap.style.background = "green";
                    alertWrap.classList.add("show");
                    setTimeout(() => { 
                        alertWrap.classList.remove("show");
                    }, 3000);
                    // ...
                }else {
                    // change color
                    validateEl.classList.remove("green");
                    validateEl.classList.remove("yellow");
                }
            }
        }
    })
    // .....

    signInForm.addEventListener("submit", (e) => {
        e.preventDefault();

        firstName = firstNameEL.value;
        lastName = lastNameEl.value;
        email = emailEl.value;
        confirmPassword = confirmPasswordEl.value;
        userPassword = userPasswordEl.value;

        var password;
        if (userPassword !== confirmPassword) {
            // alert the user 
            message = "Password does not match";
            alertError.innerHTML = message;
            alertWrap.style.background = "red";
            alertWrap.classList.add("show");
            setTimeout(() => { 
                alertWrap.classList.remove("show");
            }, 3000);
            // ...
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
    var emailEL = document.querySelector(".l-email");
    var passEL = document.querySelector(".l-pass");
    var email, password;

    var logInInputs = document.querySelectorAll(".validate-logIn");
    logInInputs.forEach(input => {
        input.onkeyup = (e) => {
            const validateEl = e.target.parentElement;
            if (e.target.classList.contains("l-email")) {
                var regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if (e.target.value.match(regexp)) {
                    // change color
                    validateEl.classList.add("green");
                     // ...
                }
                else {
                    // change color
                    validateEl.classList.remove("green");
                }
            }else if (e.target.classList.contains("l-pass")) {
                if (e.target.value.length <= e.target.getAttribute("minlength")) {
                    // change color
                    validateEl.classList.remove("green");
                    // ...
                    // Alert user
                    const message = "Password Strength: WEAK";
                    alertError.innerHTML = message;
                    alertWrap.style.background = "red";
                    alertWrap.classList.add("show");
                    // ...
                    // ...
                }else if (e.target.value.length == "5" || e.target.value.length == "6" || e.target.value.length == "7") {
                    // change color
                    validateEl.classList.add("yellow");
                    // ...
                    // Alert user
                    const message = "Password Strength: MEDIUM";
                    alertError.innerHTML = message;
                    alertWrap.style.background = "yellow";
                    alertWrap.classList.add("show");
                    // ...
                    // ...
                }else if (e.target.value.length > "8") {
                    // change color
                    validateEl.classList.add("green");
                    // ...
                    // Alert user
                    const message = "Password Strength: STRONG";
                    alertError.innerHTML = message;
                    alertWrap.style.background = "green";
                    alertWrap.classList.add("show");
                    setTimeout(() => { 
                        alertWrap.classList.remove("show");
                    }, 3000);
                    // ...
                }else {
                    // change color
                    validateEl.classList.remove("green");
                    validateEl.classList.remove("yellow");
                }
            }
        }
    })

    logInForm.addEventListener("submit", (e) => {
        e.preventDefault();
        email = emailEL.value;
        password = passEL.value;
        
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
            if (e.target.classList.contains("sign-out-btn") || e.target.classList.contains("it-s") || e.target.classList.contains("i-out")) {
                signOutFunc();

            }else if (e.target.classList.contains("delete-btn") || e.target.classList.contains("it-d") || e.target.classList.contains("i-deleted")) {
                deleteAccount();
            }
        }
    })
})();

(function(){

    const resetBtn = document.querySelector(".reset-pass-btn");
    const tagHidden = document.querySelectorAll(".l-hidden");
    const header = document.querySelector(".signIn-header");
    const tagShow = document.querySelectorAll(".l-visible");
    const resetBackBtn = document.querySelector(".back-arrow-wrap-reset");
    const headerImage = document.querySelector(".image-text");
    const r_email = document.querySelector(".r-email");

    resetBtn.onclick = () => {
        // hide elements
        tagHidden.forEach(el => {
            el.classList.add("show");
        })
        tagShow.forEach(el => {
            el.classList.add("show");
        })
        header.innerHTML = "Reset Password";
        headerImage.classList.add("change")
    }

    resetBackBtn.onclick = (e) => {
        if (e.target.classList.contains("back-arrow-wrap-reset") || e.target.classList.contains("reset-arrow")) {
            tagHidden.forEach(el => {
                el.classList.remove("show");
            })
            tagShow.forEach(el => {
                el.classList.remove("show");
            })
            header.innerHTML = "SignIn";
            headerImage.classList.add("change")
        }
    }

    logInForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = r_email.value;
        console.log(email);

        resetPassword(email)
    })

})()