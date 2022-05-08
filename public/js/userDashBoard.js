const dashBoardBtn = document.querySelector(".user-fixed-image-wrap");
const userDashBoard = document.querySelector(".user-dashboard-wrapper");


(function(){

    dashBoardBtn.addEventListener("click", (e) => {
        if (e.target.classList.contains("user-fixed-image") || e.target.classList.contains("user-fixed-image-wrap")) {
            userDashBoard.classList.toggle("shrink");
        }
    });
    /*userDashBoard.addEventListener("mouseenter", (e) => {
        userDashBoard.classList.add("shrink");
    });
    userDashBoard.addEventListener("mouseleave", (e) => {
        userDashBoard.classList.remove("shrink");
    });*/
    

})();