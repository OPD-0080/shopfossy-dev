const sideBarContainer = document.querySelector(".sidebar-content-container");
const sidebarListEls = sideBarContainer.querySelectorAll("li");
const toggleWrap = document.querySelector(".theme-toggle-wrap");
const toggleBtn = document.querySelector(".toggle-wrap");
const pages = document.querySelectorAll(".page-sections");
const pageDashboard = document.querySelector(".dashboard-container");

// SIDE BAR SECTION
(function() {
    sidebarListEls.forEach(list => {
        list.onclick = (e) => {
            const id = e.target.dataset.id;
            sideBarContainer.querySelector(".active").classList.remove("active")
            e.target.classList.add("active");

            pages.forEach(page => {
                const pageId = page.getAttribute("data-slide");
                if (id == pageId) { // compare ids
                    // show content in DOM
                        page.classList.add("switch");
                        pageDashboard.classList.add("off");

                    // ...
                }else if (id == "dashboard") {
                    page.classList.remove("switch");
                    pageDashboard.classList.remove("off")
                }
                else {
                    // show off content in DOM
                        page.classList.remove("switch");
                        pageDashboard.classList.add("off")
                    // ..
                }
            })
        }
    })
})()
// .......
// TOGGLE SECTION
toggleWrap.onclick = (e) => {
    if (e.target.classList.contains("i") || e.target.classList.contains("toggle-wrap")) {
        toggleWrap.classList.toggle("shift")

    }
}
// .........