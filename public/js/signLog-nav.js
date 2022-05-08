// IMPORTATION START


// IMPORTATION END

// VARIABLES START
const logIn = document.querySelector(".logIn-btn");
const logInContent = document.querySelector(".logIn-content");
const signInContent = document.querySelector(".signIn-content");
const backArrow = document.querySelector(".back-arrow");


// VARIABLES END

// DYNAMIC PAGE MANIPULATION START
(function(){
    logIn.onclick = (e) => {
        logInContent.classList.add("show");
        signInContent.classList.add("collapse");
    }
    backArrow.onclick = () => {
        logInContent.classList.remove("show");
        signInContent.classList.remove("collapse");
    }
})();
// DYNAMIC PAGE MANIPULATION END
