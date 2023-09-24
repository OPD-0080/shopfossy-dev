const dashBoardBtn = document.querySelector(".user-fixed-image-wrap");
var userDashBoard = document.querySelector(".user-dashboard-wrapper");
const redirectBtn = document.querySelector(".sign-in-btn");
var dashBoardContainer = document.querySelector(".user-dashboard-container");
const dashBoardBtns = document.querySelector(".user-btns");
const img1 = dashBoardBtn.querySelector(".user-fixed-image");
const userImageWrapper = document.querySelector(".user-image-wrap");
const img2 = userImageWrapper.querySelector(".user-image");

(function(){

    dashBoardBtn.addEventListener("click", (e) => {
        if (e.target.classList.contains("user-fixed-image") || e.target.classList.contains("ii") || e.target.classList.contains("user-fixed-image-wrap")) {
            userDashBoard.classList.toggle("shrink");
        }
    });
    redirectBtn.onclick = (e) => {
        if (e.target.classList.contains("i-redirect") || e.target.classList.contains("sign-in-btn") || e.target.classList.contains("it-i")) {
            userDashBoard.classList.remove("shrink");
            setTimeout(() => {
                window.location.assign("register")
            }, 1000);
        }
    }
    // display user image in DOM
    const userImageUrl =  img1.getAttribute("data-user-img");
    const userImageUrl2 =  img2.getAttribute("data-user-img2");

    if (userImageUrl == "" || userImageUrl.endsWith("null")) {
        img1.style.backgroundImage = `url(${"../img/icons/user.png"})`;
    }else {
        img1.style.backgroundImage = `url(${userImageUrl})`;
    }
    if (userImageUrl2 == "" || userImageUrl.endsWith("null")) {
        img2.style.backgroundImage = `url(${"../img/icons/user.png"})`;
    } else {
        img2.style.backgroundImage = `url(${userImageUrl2})`;
    }
    //....
})();
// DYNAMIC DASHBOARD BUTTONS
(function(){
    const checker = dashBoardContainer.querySelector(".user-email");
    const sign_edit_btns = dashBoardBtns.querySelectorAll(".off");
    const signIn_btn = dashBoardBtns.querySelector(".in");

    if (checker.innerHTML !== "") {
        // activate and deactivate buttons 
        sign_edit_btns.forEach(el => el.classList.add("show"));
        signIn_btn.classList.add("show");
        // ...
    }else {
        console.log("okay");
    }
})();
//................
// EDIT BTN
(function(){
    const edit_btn = dashBoardBtns.querySelector(".user-edit-btn");
    if (edit_btn == undefined || edit_btn == null) {
        console.log("Awaiting server responds");
    } else {
        edit_btn.onclick = (e) => {
            if (e.target.classList.contains("user-edit-btn") || e.target.classList.contains("i-edit") || e.target.classList.contains("it-e")) {
                window.location.assign("edit_profile");
            }
        }
    }

})();
// ...
// SIGN OUT BTN
(function(){
    const signOutBtns = dashBoardBtns.querySelector(".sign-out-btn");
    signOutBtns.onclick = (e) => {
        if (e.target.classList.contains("sign-out-btn") || e.target.classList.contains("i-out") || e.target.classList.contains("it-s")) {
            // signOut 
                window.location.assign("signOut")
                console.log("logged out");
            // ...
        }
    }
})();
// ....
