// IMPORTATION SECTION START

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
const deleteUser = document.querySelector(".delete-wrap");
const editUserPage = document.querySelector(".user-edited-overlay");
const editUserClose = document.querySelector(".user-edited-close");
const dashBoard = document.querySelector(".user-dashboard-wrapper");

let msg = ""; let green = "green"; let yellow = "yellow"; let red = "red"; let white = "white"; let black = "black";
// VARIABLES END

// SIGN-IN SECTION START
(function(){
    // Validate Inputs
    var signInContainer = document.querySelector(".signIn-content");
    var userNameEL = signInContainer.querySelector(".user-name");
    
    var emailEl = document.querySelector(".s-email");
    var confirmPasswordEl = document.querySelector(".password");
    var userPasswordEl = document.querySelector(".s-pass");
    var userName, email, confirmPassword, userPassword;
    

    signInInputs.forEach(input => {
        input.onkeyup = (e) => {
            const validateEl = e.target.parentElement;
            if (e.target.classList.contains("user-name")) {
                if (e.target.value.length >= e.target.getAttribute("minlength")) {
                    add_validate_color(validateEl, green);
                    // ...
                }
                else {
                    remove_validate_color(validateEl, green);
                }
            }else if (e.target.classList.contains("s-email")) {
                var regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if (e.target.value.match(regexp)) {
                    add_validate_color(validateEl, green);
                     // ...
                }
                else {
                    remove_validate_color(validateEl, green);
                }
            }else if (e.target.classList.contains("password")) {
                if (e.target.value.length <= e.target.getAttribute("minlength")) {
                    remove_validate_color(validateEl, green);
                    // ...
                    // Alert user
                    msg = "Password Strength: WEAK";
                    notification(msg, red, white);
                    // ...
                }else if (e.target.value.length == "5" || e.target.value.length == "6" || e.target.value.length == "7") {
                    add_validate_color(validateEl, yellow);
                    // ...
                    // Alert user
                    msg = "Password Strength: MEDIUM";
                    notification(msg, yellow, black);
                    // ...
                }else if (e.target.value.length > "8") {
                    add_validate_color(validateEl, green);
                    // ...
                    // Alert user
                    msg = "Password Strength: STRONG";
                    notification(msg, green, white);
                    
                    setTimeout(() => { 
                        alertWrap.classList.remove("show");
                    }, 3000);
                    // ...
                }else {
                    remove_validate_color(validateEl, green);
                    remove_validate_color(validateEl, yellow);
                }
            }else if (e.target.classList.contains("s-pass")) {
                if (e.target.value.length <= e.target.getAttribute("minlength")) {
                    remove_validate_color(validateEl, green);
                    // ...
                    // Alert user
                    msg = "Password Strength: WEAK";
                    notification(msg, red, white);
                    // ...
                }else if (e.target.value.length == "5" || e.target.value.length == "6" || e.target.value.length == "7") {
                    add_validate_color(validateEl, yellow);
                    // ...
                    // Alert user
                    msg = "Password Strength: MEDIUM";
                    notification(msg, yellow, black);
                    // ...
                }else if (e.target.value.length > "8") {
                    add_validate_color(validateEl, green);
                    // ...
                    // Alert user
                    
                    msg = "Password Strength: STRONG";
                    notification(msg, green, white);

                    setTimeout(() => { 
                        alertWrap.classList.remove("show");
                    }, 3000);
                    // ...
                }else {
                    remove_validate_color(validateEl, green);
                    remove_validate_color(validateEl, yellow);
                }
            }
        }
    })
    // .....

    function authSignIn(userName, email, userPassword, password) {
        //signIn(userName, email, userPassword, password)
        //console.log(userName, email, userPassword, password);
    }
})();
// SIGN-IN SECTION END

// LOG-IN SECTION START
(function(){
    var userNameEL = document.querySelector(".l-user");
    var passEL = document.querySelector(".l-pass");
    var email, password;

    var logInInputs = document.querySelectorAll(".validate-logIn");
    logInInputs.forEach(input => {
        input.onkeyup = (e) => {
            const validateEl = e.target.parentElement;
            if (e.target.classList.contains("l-user")) {
                var regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if (e.target.value.length >= e.target.getAttribute("minlength")) {
                    add_validate_color(validateEl, green);
                     // ...
                }
                else {
                    remove_validate_color(validateEl, green);
                }
            }else if (e.target.classList.contains("l-pass")) {
                if (e.target.value.length <= e.target.getAttribute("minlength")) {
                    remove_validate_color(validateEl, green);
                    // ...
                    // Alert user
                    msg = "Password Strength: WEAK";
                    notification(msg, red, white);
                    // ...
                    // ...
                }else if (e.target.value.length == "5" || e.target.value.length == "6" || e.target.value.length == "7") {
                    add_validate_color(validateEl, yellow);
                    // ...
                    // Alert user
                    msg = "Password Strength: MEDIUM";
                    notification(msg, yellow, black);
                    // ...
                    // ...
                }else if (e.target.value.length > "8") {
                    green = "green";
                    add_validate_color(validateEl, green);
                    // ...
                    // Alert user
                    msg = "Password Strength: STRONG";
                    notification(msg, green, white);
                    
                    setTimeout(() => { 
                        alertWrap.classList.remove("show");
                    }, 3000);
                    // ...
                }else {
                    remove_validate_color(validateEl, green);
                    remove_validate_color(validateEl, yellow);
                }
            }
        }
    })

})();
// LOG-IN SECTION END

// AUTH PROVIDER SECTION START
(function(){

    altBtns.forEach(btn => {
        btn.onclick = (e) => {
            if (e.target.classList.contains("goggle-btn")) {
                console.log("...goggle button clicked .....", e.target);
                // redirecting url to google authentication page
                window.location.assign("/auth/google")
                // ....
            }
        }
    })

})();
// AUTH PROVIDER SECTION END

// RESET PASSWORD 
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

})();
// ....

// SERVER RESPONDS
(function(){
    const server_respond = document.querySelector(".sign-in-overlay");
    const alert_class = server_respond.getAttribute("data-server");
    if (alert_class) {
        // show notification in DOM
        const server_alert = document.querySelector(".notification-wrapper");
        server_alert.classList.add("show");
        const msg = server_alert.querySelector(".note");
        console.log(msg.innerHTML.trim().indexOf(":"));
        if (msg.innerHTML.trim() == "User Successfully LogIn") {
            // redirecting to home page
            setTimeout(() => {msg.innerHTML = "Redirecting ...!"}, 3200);
            setTimeout(() => {
                window.location.assign("index");
            }, 4000);
            // ...
        }
        if (msg.innerHTML.trim().indexOf(":") >= 29) {setTimeout(() => {msg.innerHTML = "LogIn With Your Credential"}, 3200);}
        setTimeout(() => {server_alert.classList.remove("show");}, 6000);
        // ...
    }else {
        console.log("Awaiting server responds...");
    }
})()
// ...
function notification(msg, background, color) {
    const message = msg;
    alertError.innerHTML = message;
    alertWrap.style.background = `${background}`;
    alertWrap.style.color = `${color}`;
    alertWrap.classList.add("show");
}
function add_validate_color(validateEl, color) {
    validateEl.classList.add(`${color}`);
}
function remove_validate_color(validateEl, color) {
    validateEl.classList.remove(`${color}`);
}