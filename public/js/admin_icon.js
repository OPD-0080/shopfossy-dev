
const adminBtn = document.querySelector(".admin-btn");
const adminBtnContainer = document.querySelector(".admin-btn-container");
const adminContainer = document.querySelector(".admin-container");
const adminCloseBtn = document.querySelector(".admin-close");



adminBtn.addEventListener("mouseenter", () => {
    adminBtnContainer.classList.add("tip-on");
    setTimeout(() => {
        adminBtnContainer.classList.remove("tip-on")
    }, 2000);
});

adminBtn.onclick = (e) => {
    window.location.href = "../admin.html"
}
/*adminCloseBtn.onclick = () => {
    adminContainer.classList.remove("visible")
    nav1.classList.remove("off-1");
    nav2.classList.remove("off-2");

}

signOutBtn.onclick = () => {
    signOutIcon.classList.add("shrink");
    setTimeout(() => {
        signBanner.classList.add("close");
    }, 500);
    signOutBtn.style.opacity = "0";
}
*/

