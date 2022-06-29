const dashBoardBtn = document.querySelector(".user-fixed-image-wrap");
const userDashBoard = document.querySelector(".user-dashboard-wrapper");
const redirectBtn = document.querySelector(".sign-in-btn");

(function(){

    dashBoardBtn.addEventListener("click", (e) => {
        if (e.target.classList.contains("user-fixed-image") || e.target.classList.contains("user-fixed-image-wrap")) {
            userDashBoard.classList.toggle("shrink");
        }
    });
    redirectBtn.onclick = (e) => {
        if (e.target.classList.contains("i-redirect") || e.target.classList.contains("sign-in-btn") || e.target.classList.contains("it-i")) {
            userDashBoard.classList.remove("shrink");
        }
    }

})();