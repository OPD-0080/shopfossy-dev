// IMPORTATION START


// IMPORTATION END

// VARIABLES START
const logIn = document.querySelector(".logIn-btn");
const logInContent = document.querySelector(".logIn-content");
const signInContent = document.querySelector(".signIn-content");
const backArrow = document.querySelector(".back-arrow");
const headerText = document.querySelector(".signIn-header");
const signInBtn = document.querySelectorAll(".signBtn");
const signInPageCloseBtn = document.querySelector(".signInOut-close-btn");
var formOverlay = document.querySelector(".sign-in-overlay");
var userDashBoard = document.querySelector(".user-dashboard-wrapper");
// VARIABLES END

// DYNAMIC PAGE MANIPULATION START
(function(){
    logIn.onclick = (e) => {
        logInContent.classList.add("show");
        signInContent.classList.add("collapse");
        headerText.innerHTML = "SignIn";
    };
    backArrow.onclick = () => {
        logInContent.classList.remove("show");
        signInContent.classList.remove("collapse");
        headerText.innerHTML = "LogIn";
    };
    signInBtn.forEach(el => {
        el.onclick = (e) => {
            if (e.target.classList.contains("signBtn") || e.target.classList.contains("i-in") || e.target.classList.contains("it-i")) {
                // User is signed out
                formOverlay.classList.add("collapse");
                // ...
                userDashBoard.classList.remove("shrink");
            }
        }
    });
    signInPageCloseBtn.onclick = (e) => {
        formOverlay.classList.remove("collapse");
    }
    
})();
// DYNAMIC PAGE MANIPULATION END

(function(){

    const resetBtn = document.querySelector(".reset-pass-btn");
    const tagHidden = document.querySelectorAll(".l-hidden");
    const header = document.querySelector(".signIn-header");
    const tagShow = document.querySelectorAll(".l-visible");
    const resetBackBtn = document.querySelector(".back-arrow-wrap-reset");
    const headerImage = document.querySelector(".image-text");

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
            });
            tagShow.forEach(el => {
                el.classList.remove("show");
            });
            header.innerHTML = "LogIn";
            headerImage.classList.remove("change")
        }
    }
})()
